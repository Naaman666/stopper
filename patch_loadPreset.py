import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = """  function loadPreset() {
    const m = parseInt(localStorage.getItem("stopper_min"), 10);
    const s = parseInt(localStorage.getItem("stopper_sec"), 10);
    if (!isNaN(m) && Number.isInteger(m) && m >= 0 && m <= 60) customMin = m;
    if (!isNaN(s) && Number.isInteger(s) && s >= 0 && s < 60) customSec = s;
  }"""

content = re.sub(r'  function loadPreset\(\) \{\n    const m = parseInt\(localStorage\.getItem\("stopper_min"\), 10\);\n    const s = parseInt\(localStorage\.getItem\("stopper_sec"\), 10\);\n    if \(!isNaN\(m\) && m >= 0 && m <= 60\) customMin = m;\n    if \(!isNaN\(s\) && s >= 0 && s < 60\) customSec = s;\n  \}', replacement, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
