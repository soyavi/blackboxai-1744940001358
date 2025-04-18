import os
import re

root = "node_modules"
targets = [
    "@react-native-async-storage/async-storage",
    "@react-native-clipboard/clipboard",
    "react-native-gesture-handler",
    "react-native-fast-image"
]

for pkg in targets:
    manifest_path = os.path.join(root, pkg, "android", "src", "main", "AndroidManifest.xml")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as f:
            content = f.read()
        new_content = re.sub(r'\s*package="[^"]+"', '', content)
        with open(manifest_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ Fixed: {manifest_path}")
    else:
        print(f"❌ Not found: {manifest_path}")
