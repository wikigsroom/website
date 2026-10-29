"""Build small, attributed visual derivatives. Original media stays outside Git.

Requires native FFmpeg/FFprobe and Pillow. The optional archive junction is read
by exact URL path only; this script never recursively scans the source archive.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public/assets/benchmark-visuals"
CACHE = ROOT / ".vercel/visual-cache"
ORIGIN = "https://benchmark.sidcloud.cn"
ARCHIVE = ROOT / ".vercel/benchmark-source/archive"
ART = ROOT / "output/imagegen"
PLAN = json.loads((ROOT / "operations/benchmark-visual-plan.json").read_text("utf-8"))
DATA = json.loads((ROOT / "src/data/benchmarkSnapshot.json").read_text("utf-8"))
BY_ID = {case["id"]: case for case in DATA["cases"]}
NAVY = "#101623"
MUTED = "#aebed2"
CYAN = "#83dded"
PINK = "#f3a6cd"
STATUS = {"passed": "通过", "limited": "有限验证", "failed": "未通过", "archived": "历史记录", "review": "资料核查"}
FFMPEG = os.environ.get("FFMPEG_PATH", "ffmpeg")
FFPROBE = os.environ.get("FFPROBE_PATH", "ffprobe")
FONT_DIR = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"


def font(size: int, bold: bool = False):
    candidates = [FONT_DIR / ("msyhbd.ttc" if bold else "msyh.ttc"), Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc")]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    raise RuntimeError("Install a CJK font or use native Windows with Microsoft YaHei")


def run(command: list[str], binary: bool = False):
    return subprocess.run(command, check=True, capture_output=True, text=not binary,
                          creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0).stdout


def media_path(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    if f"{parsed.scheme}://{parsed.netloc}" != ORIGIN:
        raise ValueError("Only the frozen Benchmark origin is accepted")
    decoded = urllib.parse.unquote(parsed.path)
    if ".." in Path(decoded).parts:
        raise ValueError("Unexpected parent path")
    if decoded.startswith("/archive/"):
        local = ARCHIVE / decoded.removeprefix("/archive/")
        if local.is_file():
            return local
    suffix = Path(decoded).suffix or ".bin"
    target = CACHE / "downloads" / (hashlib.sha256(url.encode()).hexdigest() + suffix)
    if not target.is_file():
        target.parent.mkdir(parents=True, exist_ok=True)
        request = urllib.request.Request(url, headers={"User-Agent": "sidcloud-blog-visuals/1.0"})
        with urllib.request.urlopen(request, timeout=90) as response:
            target.write_bytes(response.read())
    return target


def probe(source: Path):
    info = source.stat()
    identity = hashlib.sha256(f"{source.resolve()}:{info.st_size}:{info.st_mtime_ns}".encode()).hexdigest()
    cached = CACHE / "probes" / (identity + ".json")
    if cached.is_file():
        return json.loads(cached.read_text("utf-8"))
    result = json.loads(run([FFPROBE, "-v", "error", "-show_entries", "format=duration:stream=width,height,codec_type,duration,nb_frames,avg_frame_rate", "-of", "json", str(source)]))
    cached.parent.mkdir(parents=True, exist_ok=True)
    cached.write_text(json.dumps(result), "utf-8")
    return result


def opened(source: Path):
    with Image.open(source) as original:
        return ImageOps.exif_transpose(original).convert("RGB")


def fit_scene(image: Image.Image, size: tuple[int, int]):
    """Contain the evidence; blurred margins fill a different aspect ratio."""
    back = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)
    back = ImageEnhance.Brightness(back.filter(ImageFilter.GaussianBlur(24))).enhance(0.4)
    foreground = ImageOps.contain(image, size, method=Image.Resampling.LANCZOS)
    back.paste(foreground, ((size[0] - foreground.width) // 2, (size[1] - foreground.height) // 2))
    return back


def webp(image: Image.Image, relative: str, width: int | None = None):
    target = PUBLIC / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    if width and image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
    image.convert("RGB").save(target, "WEBP", quality=83, method=6)
    return "/assets/benchmark-visuals/" + relative


def wrap(draw: ImageDraw.ImageDraw, text: str, use_font, width: int, limit: int | None = None):
    lines, line = [], ""
    for char in text.replace("\r", ""):
        if char == "\n" or draw.textlength(line + char, font=use_font) > width:
            lines.append(line)
            line = "" if char == "\n" else char
        else:
            line += char
    if line:
        lines.append(line)
    if limit and len(lines) > limit:
        lines = lines[:limit]
        lines[-1] = lines[-1][:-1] + "…"
    return lines


def text_lines(draw, xy, text, size, width, color=MUTED, limit=None, bold=False, spacing=1.55):
    use_font = font(size, bold)
    lines = wrap(draw, text, use_font, width, limit)
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=use_font, fill=color)
        y += round(size * spacing)
    return y


def video_frames(media):
    source = media_path(media["url"])
    details = probe(source)
    duration = float(details["format"]["duration"])
    stream = next(stream for stream in details["streams"] if stream.get("codec_type") == "video")
    frame_count = int(stream.get("nb_frames", "0")) if str(stream.get("nb_frames", "0")).isdigit() else 0
    numerator, denominator = map(float, stream.get("avg_frame_rate", "0/1").split("/"))
    fps = numerator / denominator if denominator else 0
    frames, times = [], []
    for ratio in (0.18, 0.5, 0.82):
        frame_index = round((frame_count - 1) * ratio) if frame_count else None
        time = frame_index / fps if frame_count and fps else max(0, min(duration * ratio, duration - 0.035))
        identity = hashlib.sha256((media["url"] + f"@{time:.4f}").encode()).hexdigest()
        target = CACHE / "frames" / (identity + ".png")
        if not target.is_file():
            target.parent.mkdir(parents=True, exist_ok=True)
            run([FFMPEG, "-hide_banner", "-loglevel", "error", "-nostdin", "-y", "-ss", str(max(0, time - 0.0001)), "-i", str(source),
                 "-frames:v", "1", "-vf", "scale=1280:-2", "-threads", "1", "-filter_threads", "1", str(target)])
            if not target.is_file() and frame_index is not None:
                run([FFMPEG, "-hide_banner", "-loglevel", "error", "-nostdin", "-y", "-i", str(source), "-frames:v", "1", "-vf", f"select=eq(n\\,{frame_index}),scale=1280:-2", "-threads", "1", "-filter_threads", "1", str(target)])
        frames.append(opened(target))
        times.append(round(time, 3))
    return frames, times, duration


def storyboard(frames, times):
    sheet = Image.new("RGB", (1440, 420), NAVY)
    draw = ImageDraw.Draw(sheet)
    for index, (frame, time) in enumerate(zip(frames, times)):
        sheet.paste(fit_scene(frame, (472, 350)), (index * 484, 0))
        draw.text((index * 484 + 18, 370), f"{time:.2f} s", font=font(23), fill=CYAN)
    return sheet


def audio_waveform(media, title):
    source = media_path(media["url"])
    duration = float(probe(source)["format"]["duration"])
    identity = hashlib.sha256(media["url"].encode()).hexdigest()
    cached = CACHE / "waveforms" / (identity + ".json")
    if cached.is_file():
        peaks = json.loads(cached.read_text("utf-8"))
    else:
        import array
        raw = run([FFMPEG, "-v", "error", "-nostdin", "-threads", "1", "-i", str(source), "-vn", "-ac", "1", "-ar", "4000", "-f", "s16le", "pipe:1"], binary=True)
        samples = array.array("h", raw)
        count = 580
        stride = max(1, len(samples) // count)
        peaks = [max((abs(v) for v in samples[i * stride:min(len(samples), (i + 1) * stride)]), default=0) / 32768 for i in range(count)]
        cached.parent.mkdir(parents=True, exist_ok=True)
        cached.write_text(json.dumps(peaks), "utf-8")
    sheet = Image.new("RGB", (1280, 420), NAVY)
    draw = ImageDraw.Draw(sheet)
    draw.text((50, 26), "AUDIO / 实际音轨振幅", font=font(19), fill=CYAN)
    text_lines(draw, (50, 62), title, 29, 1170, "#f2f4fb", 1, True)
    for index, peak in enumerate(peaks):
        x = 60 + index * 2
        height = max(1, peak * 99)
        draw.line((x, 240 - height, x, 240 + height), fill=PINK if index < len(peaks) / 2 else CYAN, width=1)
    draw.line((60, 240, 1220, 240), fill="#42526a", width=1)
    draw.text((60, 363), "0:00", font=font(21), fill=MUTED)
    duration_label = f"{int(duration) // 60}:{duration % 60:05.2f}"
    draw.text((1220, 363), duration_label, anchor="ra", font=font(21), fill=MUTED)
    return sheet, duration


def record_graphic(round_data, cases):
    image = Image.new("RGB", (1400, 900), NAVY)
    draw = ImageDraw.Draw(image)
    draw.text((64, 46), "BATCH NOTES / 冻结记录摘录", font=font(22), fill=CYAN)
    y = text_lines(draw, (64, 98), round_data["title"], 40, 1260, "#f2f4fb", 2, True)
    counts = Counter(case["status"] for case in cases)
    total = len(cases)
    x = 64
    colors = ["#83dded", "#e1bd84", "#ed9fbb", "#74849d", "#b2a5d8"]
    draw.text((64, y + 16), f"{round_data['date']}   ·   {round_data['device']}   ·   {total} 项关联记录", font=font(22), fill=MUTED)
    for index, (status, label) in enumerate(STATUS.items()):
        if not counts[status]:
            continue
        width = round(1260 * counts[status] / total)
        draw.rectangle((x, y + 80, x + width - 1, y + 104), fill=colors[index])
        x += width
    legend = "    ".join(f"{label} {counts[key]}" for key, label in STATUS.items() if counts[key])
    draw.text((64, y + 122), legend, font=font(24), fill=MUTED)
    selected = next((case for case in cases if case.get("textResult") and case.get("status") == "passed"),
                    next((case for case in cases if case.get("textResult")), cases[0]))
    excerpt = selected.get("textResult") or selected["summary"]
    excerpt = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", str(excerpt))
    top = y + 205
    draw.line((64, top, 1336, top), fill="#344158", width=1)
    draw.text((64, top + 24), "响应原文节选" if selected.get("textResult") else "原记录摘要", font=font(21), fill=PINK)
    text_lines(draw, (64, top + 68), selected["id"], 23, 1260, CYAN, 1)
    text_lines(draw, (64, top + 116), excerpt, 26, 1260, "#d6dfec", 6, spacing=1.55)
    draw.text((64, 844), "依据 Benchmark 1.9.0 整理 · 计数包含历史与复核状态 · 非新增实验", font=font(20), fill=MUTED)
    return image, selected


def preferred(round_data, cases):
    has_output = [case for case in cases if case["media"]]
    owned = [case for case in has_output if case["round"] == round_data["id"]]
    ordered = []
    for case_id in PLAN["preferredCases"].get(round_data["id"], []):
        candidate = next((case for case in has_output if case["id"] == case_id), None)
        if candidate and candidate not in ordered:
            ordered.append(candidate)
    for candidate in owned + has_output:
        if candidate not in ordered:
            ordered.append(candidate)
    return ordered[:3]


def art_for(round_data):
    name = PLAN["themes"].get(round_data["id"])
    if not name:
        name = "music-score" if re.search("音乐|乐谱|YuE2", round_data["title"]) else "voice-studio"
    source = ART / (name + ".png")
    if not source.is_file():
        raise RuntimeError(f"Generate the configured gpt-image-2.5 illustration first: {source.name}")
    return opened(source), name


def build_round(round_data):
    cases = [BY_ID[case_id] for case_id in round_data["caseIds"]]
    selections = preferred(round_data, cases)
    gallery, cover_frames = [], []
    cover_kind, cover_sources, cover_caption = "illustration", [], ""
    for index, case in enumerate(selections):
        # Prefer one complete moving/audio output over an existing contact sheet.
        wanted = PLAN.get("preferredMedia", {}).get(round_data["id"])
        media = next((m for m in case["media"] if m["type"] == wanted), None) or next((m for m in case["media"] if m["type"] == "video"), None) or next((m for m in case["media"] if m["type"] == "image"), None) or next((m for m in case["media"] if m["type"] == "audio"), None)
        if not media:
            continue
        reference = case["round"] != round_data["id"]
        item = {"caseId": case["id"], "title": case["title"], "sourceUrl": media["url"], "reference": reference,
                "originalRoundId": case["round"], "mediaLabel": media["label"]}
        if media["type"] == "video":
            frames, times, duration = video_frames(media)
            picture = storyboard(frames, times)
            cover_frames.append(frames[1])
            item.update(kind="video-frames", frames=times, duration=duration,
                        caption="实际成片的三个时间点；抽帧用于观察画面，运动与口型请播放完整视频。",
                        playback={"type": "video", "src": media["url"]})
            item["poster"] = webp(frames[1], f"samples/{round_data['id']}-{index}-poster.webp", 960)
            item["playback"]["poster"] = item["poster"]
            cover_kind = "video-frame" if index == 0 else cover_kind
        elif media["type"] == "image":
            picture = opened(media_path(media["url"]))
            cover_frames.append(picture)
            item.update(kind="image-result", caption="本记录的实际保存图；保留完整画面比例，可打开原图查看细节。")
            companion = next((m for m in case["media"] if m["type"] == "video"), None)
            if companion:
                item["playback"] = {"type": "video", "src": companion["url"], "poster": item["src"] if "src" in item else media["url"]}
            cover_kind = "image-result" if index == 0 else cover_kind
        else:
            picture, duration = audio_waveform(media, case["title"])
            cover_frames.append(picture)
            item.update(kind="audio-waveform", duration=duration,
                        caption="从这条音轨计算的振幅包络，时间轴覆盖完整音频；波形不代表听感评分。",
                        playback={"type": "audio", "src": media["url"]})
            cover_kind = "audio-waveform" if index == 0 else cover_kind
        item["src"] = webp(picture, f"samples/{round_data['id']}-{index}.webp", 1440)
        if media["type"] == "image" and item.get("playback"):
            item["playback"]["poster"] = item["src"]
        item["alt"] = case["title"] + " · " + {"video-frames": "实际样片分镜", "image-result": "原始结果缩略图", "audio-waveform": "完整音轨波形"}[item["kind"]]
        gallery.append(item)
        cover_sources.append(case["id"])

    art_name = None
    if not cover_frames:
        base, art_name = art_for(round_data)
        cover = ImageOps.fit(base, (1280, 720), method=Image.Resampling.LANCZOS)
        graphic, selected = record_graphic(round_data, cases)
        gallery = [{"kind": "record-graphic", "caseId": selected["id"], "title": "本批记录与原文摘录", "src": webp(graphic, f"samples/{round_data['id']}-records.webp"),
                    "alt": round_data["title"] + "的状态分布与记录原文节选", "caption": "由冻结记录整理的资料图，保留原状态与原文；封面为主题插画。",
                    "sourceUrl": f"{ORIGIN}/benchmarks/{urllib.parse.quote(selected['id'])}", "reference": selected["round"] != round_data["id"], "originalRoundId": selected["round"]}]
        cover_caption = "gpt-image-2.5 主题插画 · 本批资料与原文见下方"
    elif cover_kind == "audio-waveform":
        base, art_name = art_for(round_data)
        cover = ImageOps.fit(base, (1280, 720), method=Image.Resampling.LANCZOS)
        # The actual amplitude envelopes sit over a thematic studio image.
        overlay = Image.new("RGBA", cover.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.rectangle((0, 428, 1280, 720), fill=(8, 15, 29, 218))
        cover = Image.alpha_composite(cover.convert("RGBA"), overlay).convert("RGB")
        for index, waveform in enumerate(cover_frames[:3]):
            strip = waveform.crop((44, 130, 1234, 346)).resize((1170, 68), Image.Resampling.LANCZOS)
            cover.paste(strip, (55, 458 + index * 79))
        cover_caption = "主题插画 + 本批真实音轨波形 · 点击下方试听"
    elif len(cover_frames) == 1:
        cover = fit_scene(cover_frames[0], (1280, 720))
        cover_caption = "本批实际产物" + (" · 复核引用原批次" if gallery[0]["reference"] else "")
    else:
        cover = Image.new("RGB", (1280, 720), NAVY)
        cover.paste(fit_scene(cover_frames[0], (850, 720)), (0, 0))
        for index, picture in enumerate(cover_frames[1:3]):
            cover.paste(fit_scene(picture, (420, 354 if len(cover_frames) > 2 else 720)), (860, index * 366))
        cover_caption = ("实际视频抽帧" if cover_kind == "video-frame" else "实际图像产物") + " · " + ("含复核引用，归属见图注" if any(item["reference"] for item in gallery) else "来源见下方样本")
    hero = webp(cover, f"hero/{round_data['id']}.webp", 1280)
    card = webp(cover, f"card/{round_data['id']}.webp", 640)
    entry = {"cover": {"hero": hero, "card": card, "kind": cover_kind, "caption": cover_caption, "caseIds": cover_sources}, "gallery": gallery}
    if art_name:
        entry["cover"]["illustration"] = {"name": art_name, "model": PLAN["model"], "prompt": f"output/imagegen/prompts/{art_name}.txt", "sourceSha256": hashlib.sha256((ART / (art_name + ".png")).read_bytes()).hexdigest()}
    return entry


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--round", action="append", dest="round_ids", help="Rebuild selected batches, preserving the other manifest entries")
    options = parser.parse_args()
    PUBLIC.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)
    manifest_path = ROOT / "src/data/benchmarkVisuals.json"
    manifest = json.loads(manifest_path.read_text("utf-8")) if options.round_ids and manifest_path.exists() else {"snapshotSha256": DATA["sourceSha256"], "rounds": {}, "research": {}}
    for round_data in DATA["rounds"]:
        if options.round_ids and round_data["id"] not in options.round_ids:
            continue
        entry = build_round(round_data)
        manifest["rounds"][round_data["id"]] = entry
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", "utf-8")
        print(f"{round_data['id']}: {entry['cover']['kind']}, {len(entry['gallery'])} figures", flush=True)
    if not options.round_ids:
        for slug, theme in PLAN["researchCovers"].items():
            image = ImageOps.fit(opened(ART / (theme + ".png")), (1280, 720), method=Image.Resampling.LANCZOS)
            manifest["research"][slug] = {"hero": webp(image, f"hero/{slug}.webp"), "card": webp(image, f"card/{slug}.webp", 640), "kind": "illustration", "caption": "gpt-image-2.5 主题插画", "illustration": {"name": theme, "model": PLAN["model"], "prompt": f"output/imagegen/prompts/{theme}.txt", "sourceSha256": hashlib.sha256((ART / (theme + ".png")).read_bytes()).hexdigest()}}
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", "utf-8")
    referenced = set()
    for entry in manifest["rounds"].values():
        referenced.update((entry["cover"]["hero"], entry["cover"]["card"]))
        for figure in entry["gallery"]:
            referenced.add(figure["src"])
            if figure.get("poster"):
                referenced.add(figure["poster"])
    for cover in manifest["research"].values():
        referenced.update((cover["hero"], cover["card"]))
    obsolete = [path for path in PUBLIC.rglob("*.webp") if "/assets/benchmark-visuals/" + path.relative_to(PUBLIC).as_posix() not in referenced]
    for path in obsolete:
        if not path.resolve().is_relative_to(PUBLIC.resolve()):
            raise RuntimeError("Refusing to remove an asset outside the generated directory")
    for path in obsolete:
        path.unlink()
    print(f"Visual manifest saved: {len(manifest['rounds'])} batches; originals remain outside the public directory.", flush=True)


if __name__ == "__main__":
    main()
