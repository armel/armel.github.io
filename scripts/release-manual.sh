#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
wiki_root="${1:-$repo_root/../uv-k1-k5v3-firmware-custom.wiki}"
manual_root="$repo_root/manual"

pages=(
  Advanced-features.md AirCopy.md Beacon.md Button-functions.md
  FM-broadcast-radio-receiver.md Fox-Hunt.md Fox-Hunt-and-Beacon.md Getting-started.md Home.md
  Menu.md Multiboot-and-Multiconfig.md Overlay-applications.md Overlay-apps.md
  Programming-with-CHIRP.md Radio-operation.md Recent-changes.md Scanning.md
  Spectrum-analyzer.md Troubleshooting.md UV-Studio.md
  Videos-and-tutorials.md
)

mkdir -p "$manual_root/pages"
for page in "${pages[@]}"; do
  cp "$wiki_root/$page" "$manual_root/pages/$page"
done

python3 - "$manual_root" <<'PY'
import json
import pathlib
import sys

manual_root = pathlib.Path(sys.argv[1])
pages_root = manual_root / "pages"
content = {
    page.name: page.read_text(encoding="utf-8")
    for page in sorted(pages_root.glob("*.md"))
}
output = "window.UV_MANUAL_PAGES = " + json.dumps(
    content, ensure_ascii=False, separators=(",", ":")
) + ";\n"
(manual_root / "js" / "content.js").write_text(output, encoding="utf-8")

for language, variable in (
    ("fr", "UV_MANUAL_PAGES_FR"),
    ("it", "UV_MANUAL_PAGES_IT"),
    ("es", "UV_MANUAL_PAGES_ES"),
    ("de", "UV_MANUAL_PAGES_DE"),
    ("pt", "UV_MANUAL_PAGES_PT"),
    ("ru", "UV_MANUAL_PAGES_RU"),
    ("pl", "UV_MANUAL_PAGES_PL"),
    ("zh", "UV_MANUAL_PAGES_ZH"),
    ("nl", "UV_MANUAL_PAGES_NL"),
):
    localized_root = manual_root / "pages" / language
    if not localized_root.is_dir():
        continue
    localized_content = {
        page.name: page.read_text(encoding="utf-8")
        for page in sorted(localized_root.glob("*.md"))
    }
    localized_output = f"window.{variable} = " + json.dumps(
        localized_content, ensure_ascii=False, separators=(",", ":")
    ) + ";\n"
    (manual_root / "js" / f"content-{language}.js").write_text(localized_output, encoding="utf-8")
PY

echo "UV Manual content updated from $wiki_root"
