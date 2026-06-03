import os
import shutil

src_dir = r"C:\Users\shiva\.gemini\antigravity\scratch\student-career-roadmaps"
dist_dir = os.path.join(src_dir, "dist")

os.makedirs(dist_dir, exist_ok=True)

items_to_copy = [
    "btech.html",
    "btech-ece.html",
    "btech-eee.html",
    "btech-hardware.html",
    "btech-mechanical.html",
    "btech-software.html",
    "government.html",
    "government-central.html",
    "government-state.html",
    "leaderboard.html",
    "app.js",
    "styles.css",
    "images",
    "roadmaps",
]

for item in items_to_copy:
    src_path = os.path.join(src_dir, item)
    dst_path = os.path.join(dist_dir, item)

    if not os.path.exists(src_path):
        print(f"[WARN] Source path does not exist: {src_path}")
        continue

    # Clean target first if it exists
    if os.path.exists(dst_path):
        if os.path.isdir(dst_path):
            shutil.rmtree(dst_path)
        else:
            os.remove(dst_path)

    if os.path.isdir(src_path):
        # We need to make sure we don't recursively copy dist inside itself
        shutil.copytree(src_path, dst_path)
        print(f"[OK] Copied directory {item} to dist/")
    else:
        shutil.copy2(src_path, dst_path)
        print(f"[OK] Copied file {item} to dist/")

print("--- Asset Copying Complete! ---")
