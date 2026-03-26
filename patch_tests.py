import re

with open('tests/timer.spec.js', 'r') as f:
    content = f.read()

content = re.sub(
    r"    // Trigger start\n    await btnStart\.click\(\);\n",
    "    // Select a preset button first, so duration > 0\n    await page.locator('.preset-btn:first-child').click();\n    // Trigger start\n    await btnStart.click();\n",
    content
)
content = re.sub(
    r"    await btnStart\.click\(\); // Start it\n",
    "    // Select a preset button first, so duration > 0\n    await page.locator('.preset-btn:first-child').click();\n    await btnStart.click(); // Start it\n",
    content
)

with open('tests/timer.spec.js', 'w') as f:
    f.write(content)
