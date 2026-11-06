"""Fetch a reviewed list of public WeChat articles into an ignored local cache.

No browser, account login, full-text republication, or model generation is used.
Install native dependencies with: python -m pip install requests beautifulsoup4
"""

import argparse
import concurrent.futures
import hashlib
import json
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.parse import unquote, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
ZONE = timezone(timedelta(hours=8))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--batch", default="2026-11-06")
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args()
    config = json.loads((ROOT / "operations/wechat-batches" / f"{args.batch}.json").read_text(encoding="utf-8"))
    cache = ROOT / ".vercel/wechat-import" / args.batch
    cache.mkdir(parents=True, exist_ok=True)

    def fetch(item):
        assert urlparse(item["url"]).hostname == "mp.weixin.qq.com"
        filename = cache / f"{item['index']:02}.html"
        if args.refresh or not filename.exists():
            response = requests.get(item["url"], headers={"User-Agent": "Mozilla/5.0"}, timeout=45)
            response.raise_for_status()
            response.encoding = "utf-8"
            filename.write_text(response.text, encoding="utf-8")
        raw = filename.read_text(encoding="utf-8")
        soup = BeautifulSoup(raw, "html.parser")
        body = soup.select_one("#js_content")
        title = soup.select_one("#activity-name")
        account = soup.select_one("#js_name")
        if not body or not title or not body.get_text(strip=True):
            raise RuntimeError(f"Source {item['index']} did not expose an article; retain its URL and do not invent content")
        metadata = {node.get("property") or node.get("name"): node.get("content")
                    for node in soup.select("meta[content]")}
        timestamp = re.search(r'var\s+ct\s*=\s*["\x27](\d+)', raw)
        published = datetime.fromtimestamp(int(timestamp.group(1)), ZONE).isoformat() if timestamp else None
        images = [{"url": node.get("data-src") or node.get("src"),
                   "alt": node.get("alt", ""), "type": node.get("data-type", "")}
                  for node in body.select("img")]
        videos = [{"id": node.get("data-mpvid"),
                   "playerUrl": node.get("data-src"),
                   "posterUrl": unquote(node.get("data-cover", "")).replace("http://", "https://")}
                  for node in body.select("iframe[data-mpvid], mp-video[data-mpvid]")]
        record = {"index": item["index"], "slug": item["slug"], "url": item["url"],
                  "title": title.get_text(" ", strip=True),
                  "account": account.get_text(" ", strip=True) if account else "",
                  "byline": metadata.get("author") or "", "sourcePublishedAt": published,
                  "retrievedAt": datetime.now(timezone.utc).isoformat(),
                  "htmlSha256": hashlib.sha256(raw.encode()).hexdigest(),
                  "textSha256": hashlib.sha256(body.get_text("\n", strip=True).encode()).hexdigest(),
                  "text": body.get_text("\n", strip=True), "images": images, "videos": videos}
        (cache / f"{item['index']:02}-source.json").write_text(
            json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        return record

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        records = list(pool.map(fetch, config["articles"]))
    (cache / "sources.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for item in records:
        print(f"Source {item['index']:02}: {item['title']} | {item['sourcePublishedAt']} | "
              f"{len(item['images'])} images / {len(item['videos'])} videos")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
