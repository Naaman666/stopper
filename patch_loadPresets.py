# flake8: noqa: E501
import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

replacement = """  function loadPresets() {
    try {
      const saved = JSON.parse(localStorage.getItem("stopper_presets"));
      if (Array.isArray(saved) && saved.length === 10) {
        // Validate each item: it must be either null, or an object with valid min/sec numbers
        const isValid = saved.every(p => {
          if (p === null) return true;
          if (typeof p !== 'object' || Array.isArray(p)) return false;
          const { min, sec } = p;
          return Number.isInteger(min) && min >= 0 && min <= 60 &&
                 Number.isInteger(sec) && sec >= 0 && sec < 60;
        });
        if (isValid) {
          presets = saved;
          return;
        } else {
          console.warn("Érvénytelen időzítő beállítások (presets) formátum a localStorage-ben.");
        }
      }
    } catch (e) {}"""

content = re.sub(
    r'  function loadPresets\(\) \{\n    try \{\n      const saved = JSON\.parse\(localStorage\.getItem\("stopper_presets"\)\);\n      if \(Array\.isArray\(saved\) && saved\.length === 10\) \{\n        presets = saved;\n        return;\n      \}\n    \} catch \(e\) \{\}',
    replacement,
    content,
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)
