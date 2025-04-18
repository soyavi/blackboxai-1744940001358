import os
import re

def find_manifest_package(manifest_path):
    try:
        with open(manifest_path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'package="([\w\.]+)"', content)
            if match:
                return match.group(1)
    except:
        pass
    return None

def inject_namespace(build_gradle_path, namespace):
    with open(build_gradle_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'namespace' in content:
        return False  # Ya tiene namespace

    pattern = r'android\s*{'
    match = re.search(pattern, content)
    if match:
        insert_pos = match.end()
        patched_content = content[:insert_pos] + f'\n    namespace "{namespace}"' + content[insert_pos:]

        with open(build_gradle_path, 'w', encoding='utf-8') as f:
            f.write(patched_content)
        return True

    return False

def fix_all_modules():
    node_modules_path = os.path.join(os.getcwd(), 'node_modules')
    patched = []

    for root, dirs, files in os.walk(node_modules_path):
        if 'build.gradle' in files and 'src' in dirs:
            gradle_path = os.path.join(root, 'build.gradle')
            manifest_path = os.path.join(root, 'src', 'main', 'AndroidManifest.xml')
            if os.path.isfile(manifest_path):
                namespace = find_manifest_package(manifest_path)
                if namespace:
                    if inject_namespace(gradle_path, namespace):
                        print(f"✅ Patched namespace '{namespace}' into {gradle_path}")
                        patched.append(gradle_path)

    print(f"\n🎯 Total namespaces patched: {len(patched)}")

if __name__ == "__main__":
    fix_all_modules()
