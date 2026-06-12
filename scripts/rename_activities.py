import os
import re

replacements = {
    "calm-space-visualizer": "guided_imagery",
    "clutter_and_emotional_journal": "clutter_journal",
    "fear_ladder_newest": "fear_ladder",
    "feelinsvsfact": "feelings_fact",
    "gentle-thoughts": "ocd_tips",
    "mind-path-cards": "cognitive_distortions",
    "ocd_daily_life_new": "daily_life",
    "ocd_moments_tracker_new": "ocd_moments",
    "one_thing_updated": "one_thing_out"
}

def replace_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return

    original_content = content
    for old, new in replacements.items():
        # Match the slug exactly to avoid partial matches (though these are specific enough)
        # We also want to match occurrences in imports like '@/app/...' and translation keys like '"slug": {'
        content = content.replace(old, new)

    if content != original_content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")
        except Exception as e:
            print(f"Error writing to {file_path}: {e}")

def walk_and_replace(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.css')):
                file_path = os.path.join(root, file)
                replace_in_file(file_path)

if __name__ == "__main__":
    base_dir = "."
    src_dir = os.path.join(base_dir, "src")
    locales_dir = os.path.join(base_dir, "public", "locales")
    
    print("Replacing slugs in src...")
    walk_and_replace(src_dir)
    print("Replacing slugs in public/locales...")
    walk_and_replace(locales_dir)
    print("Done.")
