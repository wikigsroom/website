"""Build attributed small derivatives from a human-reviewed WeChat media plan."""

import argparse
import hashlib
import json
from pathlib import Path

import requests
from PIL import Image, ImageOps, ImageSequence

ROOT = Path(__file__).resolve().parents[1]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def derivative(source, output, width=1120):
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        animated = getattr(image, "n_frames", 1) > 1
        frames, durations = [], []
        for frame in ImageSequence.Iterator(image):
            current = frame.convert("RGBA")
            current.thumbnail((width, 1800), Image.Resampling.LANCZOS)
            frames.append(current)
            durations.append(frame.info.get("duration", 100))
        if animated:
            frames[0].save(output, "WEBP", save_all=True, append_images=frames[1:],
                           duration=durations, loop=image.info.get("loop", 0), quality=75, method=6)
        else:
            frames[0].save(output, "WEBP", quality=82, method=6)
        return {"src": "/" + output.relative_to(ROOT / "public").as_posix(),
                "width": frames[0].width, "height": frames[0].height, "frames": len(frames),
                "durationMs": sum(durations) if animated else 0,
                "sha256": sha(output.read_bytes()), "bytes": output.stat().st_size}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--batch", default="2026-11-06")
    parser.add_argument("--skip-covers", action="store_true")
    args = parser.parse_args()
    plans = ROOT / "operations/wechat-batches"
    config = json.loads((plans / f"{args.batch}.json").read_text(encoding="utf-8"))
    plan = json.loads((plans / f"{args.batch}-media.json").read_text(encoding="utf-8"))
    cache = ROOT / ".vercel/wechat-import" / args.batch
    sources = json.loads((cache / "sources.json").read_text(encoding="utf-8"))
    output = ROOT / "public/assets/wechat" / args.batch
    ledger_path = ROOT / "src/data/wechatSources.json"
    previous = json.loads(ledger_path.read_text(encoding="utf-8")) if ledger_path.exists() else {}
    known_media = {media["id"]: media for article in previous.get("articles", [])
                   if article.get("batch", previous.get("batch")) == args.batch
                   for media in article["materials"]}
    records = []
    for item in sources:
        slug = item["slug"]
        materials = []
        for selected in plan[slug]:
            ident = selected["id"]
            index, kind, position = ident.split("-")
            assert int(index) == item["index"] and kind in ("image", "poster")
            origin = item["images"][int(position) - 1]["url"] if kind == "image" else item["videos"][int(position) - 1]["posterUrl"]
            original = cache / "images" / ident
            original.parent.mkdir(parents=True, exist_ok=True)
            if not original.exists():
                response = requests.get(origin, headers={"User-Agent": "Mozilla/5.0",
                                        "Referer": item["url"]}, timeout=40)
                response.raise_for_status()
                original.write_bytes(response.content)
            original_hash = sha(original.read_bytes())
            target = output / "materials" / f"{ident}.webp"
            cached = known_media.get(ident)
            if cached and target.exists() and cached["originalSha256"] == original_hash and sha(target.read_bytes()) == cached["sha256"]:
                rendered = {key: cached[key] for key in ("src", "width", "height", "frames", "durationMs", "sha256", "bytes")}
            else:
                rendered = derivative(original, target)
            media = {"id": ident, "caption": selected["caption"],
                     "kind": "video-reference" if kind == "poster" else "image",
                     "originalUrl": origin, "originalSha256": original_hash, **rendered}
            if kind == "poster":
                media["videoId"] = item["videos"][int(position) - 1]["id"]
                media["playerUrl"] = item["videos"][int(position) - 1]["playerUrl"]
            materials.append(media)
        cover = {"model": config["model"], "skill": "sub2-image-gen",
                 "hero": f"/assets/wechat/{args.batch}/hero/{slug}.webp",
                 "card": f"/assets/wechat/{args.batch}/card/{slug}.webp",
                 "source": f"output/imagegen/wechat-{args.batch}/{slug}.png",
                 "prompt": f"output/imagegen/wechat-{args.batch}/prompts/{slug}.txt"}
        if not args.skip_covers:
            source = ROOT / cover["source"]
            with Image.open(source) as image:
                for variant, size in (("hero", (1120, 700)), ("card", (640, 400))):
                    dest = ROOT / "public" / cover[variant].lstrip("/")
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    ImageOps.fit(image.convert("RGB"), size, method=Image.Resampling.LANCZOS).save(
                        dest, "WEBP", quality=84 if variant == "hero" else 78, method=6)
                    cover[f"{variant}Sha256"] = sha(dest.read_bytes())
            cover["sourceSha256"] = sha(source.read_bytes())
            cover["promptSha256"] = sha((ROOT / cover["prompt"]).read_bytes())
        records.append({key: value for key, value in item.items() if key != "text"} |
                       {"batch": args.batch, "publishedAt": config["publishedAt"],
                        "cover": cover, "materials": materials})
        print(f"Materials prepared: {slug} ({len(materials)} figures)", flush=True)
    retained = [item for item in previous.get("articles", [])
                if item.get("batch", previous.get("batch")) != args.batch]
    all_records = retained + records
    assert len({item["slug"] for item in all_records}) == len(all_records), "Duplicate slug across batches"
    assert len({item["url"] for item in all_records}) == len(all_records), "Review an existing source instead of importing it twice"
    ledger = {"schemaVersion": 1, "latestBatch": args.batch,
              "editorialPolicy": "Original summaries with source credit; source illustrations and generated covers are attributed separately. Video posters link to the original article; no video playback is implied.",
              "articles": all_records}
    ledger_path.write_text(
        json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
