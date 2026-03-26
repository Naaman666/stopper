import os
import re

files = [
    "patch_conflicts.py",
    "patch_conflicts_brave.py",
    "patch_loadPreset.py",
    "patch_loadPresets.py",
    "patch_tests.py"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Ignore E501 errors for long lines
    content = "# flake8: noqa: E501\n" + content

    with open(file, 'w') as f:
        f.write(content)
