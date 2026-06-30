import os
import shutil

# Files to move from static/ to static/delimitation/images/
images_to_move = [
    "delimitation-diagram.png",
    "delimitation_hero.png",
    "delimitation_card.png",
    "tn-up-comparison.png",
    "compare-1.png",
    "compare-2.png",
    "gerrymander-1.png",
    "gerrymander-2.png",
    "gerrymander-3.png"
]

# Move data files
data_dir = "static/data"
new_data_dir = "static/delimitation/data"
os.makedirs(new_data_dir, exist_ok=True)
if os.path.exists(data_dir):
    for f in os.listdir(data_dir):
        if f.endswith(".geojson") or f.endswith(".json"):
            src = os.path.join(data_dir, f)
            dst = os.path.join(new_data_dir, f)
            if not os.path.exists(dst):
                shutil.move(src, dst)

# Move image files
os.makedirs("static/delimitation/images", exist_ok=True)
for img in images_to_move:
    src = os.path.join("static", img)
    if os.path.exists(src):
        dst = os.path.join("static/delimitation/images", img)
        if not os.path.exists(dst):
            shutil.move(src, dst)

# Search and replace in src/
replacements = []
for img in images_to_move:
    replacements.append((f"/{img}", f"/delimitation/images/{img}"))
    # In case there are quotes around it without a slash
    replacements.append((f"'{img}'", f"'/delimitation/images/{img}'"))
    replacements.append((f'"{img}"', f'"/delimitation/images/{img}"'))

# For data references
replacements.append(("/data/", "/delimitation/data/"))
replacements.append(("'/data/", "'/delimitation/data/"))
replacements.append(('"/data/', '"/delimitation/data/'))

src_dir = "src"
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith((".svelte", ".js", ".html")):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            new_content = content
            for old, new in replacements:
                new_content = new_content.replace(old, new)
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                print(f"Updated {path}")
