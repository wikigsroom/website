"""Generate the reviewed batch's covers through the user-selected local skill."""

import argparse
import concurrent.futures
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STYLE = """Create a seamless, edge-to-edge studio photograph of a tactile miniature diorama, landscape 1536x1024. Every visible surface is blank or carries only nonverbal illustration. The scene is entirely physical objects, without a page layout or typographic elements.
Subject and scene: {theme}
Style: sophisticated editorial miniature diorama with tactile paper, matte ceramic,
brushed metal and restrained technical linework. Carefully art-directed, warm and
human, generous negative space, one clear visual idea. Large readable shapes,
subtle material detail, convincing spatial layering. Composition: central hero
occupies the middle 75%, all important objects inside a safe centered 16:10 crop.
Lighting: soft directional studio daylight, gentle contact shadows, muted ivory
background fading into warm pale grey. Palette: ivory, charcoal and the specified
two accent colors. No text, letters, logos, watermarks, code, UI screenshots,
generic glowing AI brains, random circuit patterns, or busy decorative clutter.
This is an explicitly labeled thematic illustration, not a measured model output.
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--batch", default="2026-11-06")
    parser.add_argument("--skill", required=True, type=Path,
                        help="Installed sub2-image-gen script; never copy it here")
    parser.add_argument("--workers", default=2, type=int, choices=(1, 2))
    parser.add_argument("--prepare-only", action="store_true", help="Write all prompts without calling the gateway")
    args = parser.parse_args()
    config = json.loads((ROOT / "operations/wechat-batches" / f"{args.batch}.json").read_text(encoding="utf-8"))
    output = ROOT / "output/imagegen" / f"wechat-{args.batch}"
    prompts = output / "prompts"
    prompts.mkdir(parents=True, exist_ok=True)
    assert args.skill.is_file(), "The user-selected skill script must be installed"
    for item in config["articles"]:
        prompt = prompts / f"{item['slug']}.txt"
        desired = STYLE.format(theme=item["theme"])
        # Existing prompt files are the reviewed input, including visual-review
        # refinements. Never overwrite them from a generic theme template.
        if not prompt.exists():
            prompt.write_text(desired, encoding="utf-8", newline="\n")
    if args.prepare_only:
        print(f"Prompts prepared: {len(config['articles'])}")
        return

    def generate(item):
        prompt = prompts / f"{item['slug']}.txt"
        image = output / f"{item['slug']}.png"
        if not image.exists():
            command = [sys.executable, str(args.skill), "generate", "--model", config["model"],
                       "--size", "1536x1024", "--quality", "high", "--output-format", "png",
                       "--prompt-file", str(prompt), "--out", str(image)]
            result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True,
                                    encoding="utf-8", errors="replace")
            if result.returncode:
                # Skill errors describe the gateway response; retain them locally,
                # not in public manifests. No provider/model fallback is attempted.
                private = ROOT / ".vercel/wechat-import" / args.batch
                private.mkdir(parents=True, exist_ok=True)
                (private / f"{item['slug']}-generation-error.log").write_text(
                    result.stdout + result.stderr, encoding="utf-8")
                raise RuntimeError(f"Gateway generation failed for {item['slug']}; inspect the local error log")
        from PIL import Image
        with Image.open(image) as content:
            content.verify()
        with Image.open(image) as content:
            dimensions = list(content.size)
        entry = {"slug": item["slug"], "model": config["model"], "quality": "high",
                 "requestedSize": "1536x1024", "dimensions": dimensions,
                 "source": image.relative_to(ROOT).as_posix(),
                 "prompt": prompt.relative_to(ROOT).as_posix(),
                 "promptSha256": hashlib.sha256(prompt.read_bytes()).hexdigest(),
                 "sourceSha256": hashlib.sha256(image.read_bytes()).hexdigest(),
                 "bytes": image.stat().st_size}
        print(f"Cover verified: {item['slug']}", flush=True)
        return entry

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        results = list(pool.map(generate, config["articles"]))
    (output / "manifest.json").write_text(json.dumps({
        "batch": args.batch, "skill": "sub2-image-gen", "model": config["model"],
        "modelAuthorization": config.get("modelAuthorization"),
        "verifiedAt": datetime.now(timezone.utc).isoformat(), "covers": results,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
