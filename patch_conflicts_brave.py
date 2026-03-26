import re

with open('index.html', 'r') as f:
    content = f.read()

content = re.sub(
    r'<<<<<<< HEAD\n    if \(state === "idle"\) { lastSpoken = -1; }\n=======\n    if \(state === "idle"\) { timeLeft = totalSec; lastSpoken = -1; }\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '    if (state === "idle") { timeLeft = totalSec; lastSpoken = -1; }\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n  function clearTimers\(\) {\n    clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n    tickTimer = null; finishTimer = null;\n  }\n\n  function resetToIdleState\(\) {\n    clearTimers\(\);\n    state = "idle"; lastSpoken = -1;\n  }\n\n  function resetToIdle\(\) {\n    resetToIdleState\(\);\n    timeLeft = totalSec;\n=======\n=======\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n  function resetToIdle\(\) {\n    clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n    tickTimer = null; finishTimer = null;\n    state = "idle"; timeLeft = totalSec; lastSpoken = -1;\n<<<<<<< HEAD\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n=======\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '  function clearTimers() {\n    clearTimeout(tickTimer); clearTimeout(finishTimer);\n    tickTimer = null; finishTimer = null;\n  }\n\n  function resetToIdleState() {\n    clearTimers();\n    state = "idle"; lastSpoken = -1;\n  }\n\n  function resetToIdle() {\n    resetToIdleState();\n    timeLeft = totalSec;\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n=======\n  // ── Keyboard controls ──\n  document\.addEventListener\("keydown", \(e\) => {\n    if \(e\.ctrlKey \|\| e\.metaKey \|\| e\.altKey\) return;\n    switch \(e\.code\) {\n      case "Space":\n      case "Enter":\n        e\.preventDefault\(\);\n        if \(state === "running"\) stopTimer\(\);\n        else if \(state === "idle" \|\| state === "paused"\) { unlockTTS\(\); startTimer\(\); }\n        break;\n      case "Escape":\n        e\.preventDefault\(\);\n        if \(state === "paused" \|\| state === "finished"\) resetToIdle\(\);\n        break;\n      case "ArrowUp":\n      case "ArrowRight":\n        if \(state === "idle"\) { e\.preventDefault\(\); setDuration\(totalSec \+ 60\); }\n        break;\n      case "ArrowDown":\n      case "ArrowLeft":\n        if \(state === "idle" && totalSec > 60\) { e\.preventDefault\(\); setDuration\(totalSec - 60\); }\n        break;\n    }\n  }\);\n\n  // ── Preset gombok ──\n  function initPresetUI\(\) {\n    pdWrap = document\.getElementById\("presets-wrap"\);\n    renderPresets\(\);\n  }\n  function renderPresets\(\) {\n    if \(!pdWrap\) return;\n    pdWrap\.innerHTML = "";\n    savedPresets\.forEach\(\(p\) => {\n      const b = document\.createElement\("button"\);\n      b\.className = "preset-btn";\n      b\.textContent = p \+ "m";\n      b\.setAttribute\("aria-label", `Beállítás ${p} percre`);\n      b\.onclick = \(\) => setDuration\(p \* 60\);\n      if \(state !== "idle"\) { b\.disabled = true; b\.classList\.add\("locked"\); }\n      pdWrap\.appendChild\(b\);\n    }\);\n    const db = document\.createElement\("button"\);\n    db\.className = "preset-btn default-btn";\n    db\.id = "defaultBtn";\n    db\.textContent = "Alap";\n    db\.setAttribute\("aria-label", "Alapértelmezett idő beállítása"\);\n    db\.onclick = \(\) => {\n      customMin = 5; customSec = 0;\n      if \(minDrum\) minDrum\.scrollToValue\(customMin, true\);\n      if \(secDrum\) secDrum\.scrollToValue\(customSec, true\);\n      savePreset\(\);\n      updateUI\(\);\n    };\n    if \(state !== "idle"\) { db\.disabled = true; db\.classList\.add\("locked"\); }\n    pdWrap\.appendChild\(db\);\n  }\n\n  // ── Default gomb \(moved inside renderPresets\)\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '  // ── Keyboard controls ──\n  document.addEventListener("keydown", (e) => {\n    if (e.ctrlKey || e.metaKey || e.altKey) return;\n    switch (e.code) {\n      case "Space":\n      case "Enter":\n        e.preventDefault();\n        if (state === "running") stopTimer();\n        else if (state === "idle" || state === "paused") { unlockTTS(); startTimer(); }\n        break;\n      case "Escape":\n        e.preventDefault();\n        if (state === "paused" || state === "finished") resetToIdle();\n        break;\n      case "ArrowUp":\n      case "ArrowRight":\n        if (state === "idle") { e.preventDefault(); setDuration(totalSec + 60); }\n        break;\n      case "ArrowDown":\n      case "ArrowLeft":\n        if (state === "idle" && totalSec > 60) { e.preventDefault(); setDuration(totalSec - 60); }\n        break;\n    }\n  });\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n        if \(timeLeft < totalSec\) {\n          btnStop\.style\.visibility = "visible";\n          btnStop\.textContent = "↺ Reset"; btnStop\.setAttribute\("aria-label", "Visszaállítás"\);\n        } else {\n          btnStop\.style\.visibility = "hidden";\n          btnStop\.textContent = "⏹ Stop"; btnStop\.setAttribute\("aria-label", "Stop"\);\n        }\n=======\n        btnStop\.style\.visibility = "hidden";\n        btnStop\.textContent = "⏹ Stop"; btnStop\.setAttribute\("aria-label", "Stop"\);\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '        if (timeLeft < totalSec) {\n          btnStop.style.visibility = "visible";\n          btnStop.textContent = "↺ Reset"; btnStop.setAttribute("aria-label", "Visszaállítás");\n        } else {\n          btnStop.style.visibility = "hidden";\n          btnStop.textContent = "⏹ Stop"; btnStop.setAttribute("aria-label", "Stop");\n        }\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n    if \(pdWrap\) pdWrap\.classList\.toggle\("locked", state === "running"\);\n\n=======\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '    if (pdWrap) pdWrap.classList.toggle("locked", state === "running");\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n  btnStop\.addEventListener\("click", \(\) => {\n    if \(state === "running"\) stopTimer\(\);\n    else resetToIdle\(\);\n  }\);\n  btnStart\.addEventListener\("click", \(\) => {\n=======\n  if \(btnStop\) btnStop\.addEventListener\("click", \(\) => {\n    if \(state === "running"\) stopTimer\(\);\n    else if \(state === "paused" \|\| state === "finished"\) resetToIdle\(\);\n  }\);\n  if \(btnStart\) btnStart\.addEventListener\("click", \(\) => {\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '  btnStop.addEventListener("click", () => {\n    if (state === "running") stopTimer();\n    else resetToIdle();\n  });\n  btnStart.addEventListener("click", () => {\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n      resetToIdleState\(\);\n=======\n      clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n      tickTimer = null; finishTimer = null;\n      state = "idle"; lastSpoken = -1;\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '      resetToIdleState();\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n      this\.scrollToValue\(0, false\); // Kezdeti renderelés garantálása\n=======\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '      this.scrollToValue(0, false); // Kezdeti renderelés garantálása\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n      this\.el\.addEventListener\("pointerdown", \(e\) => this\.onDown\(e\)\);\n      this\.el\.addEventListener\("pointermove", \(e\) => this\.onMove\(e\)\);\n      this\.el\.addEventListener\("pointerup", \(\) => this\.onUp\(\)\);\n      this\.el\.addEventListener\("pointercancel", \(\) => this\.onUp\(\)\);\n=======\n      try {\n        this\.el\.addEventListener\("pointerdown", \(e\) => this\.onDown\(e\)\);\n        this\.el\.addEventListener\("pointermove", \(e\) => this\.onMove\(e\)\);\n        this\.el\.addEventListener\("pointerup", \(\) => this\.onUp\(\)\);\n        this\.el\.addEventListener\("pointercancel", \(\) => this\.onUp\(\)\);\n      } catch\(err\) {\n        // Fallback for older browsers\n        this\.el\.addEventListener\("mousedown", \(e\) => this\.onDown\(e\)\);\n        this\.el\.addEventListener\("mousemove", \(e\) => this\.onMove\(e\)\);\n        this\.el\.addEventListener\("mouseup", \(\) => this\.onUp\(\)\);\n        this\.el\.addEventListener\("mouseleave", \(\) => this\.onUp\(\)\);\n\n        this\.el\.addEventListener\("touchstart", \(e\) => {\n          if \(e\.touches\.length === 1\) { this\.onDown\(e\.touches\[0\]\); }\n        }, { passive: false }\);\n        this\.el\.addEventListener\("touchmove", \(e\) => {\n          if \(!this\.isDragging \|\| e\.touches\.length !== 1\) return;\n          e\.preventDefault\(\);\n          const dy = e\.touches\[0\]\.clientY - this\.lastY;\n          this\.lastY = e\.touches\[0\]\.clientY;\n          this\.velocity = dy / \(Date\.now\(\) - this\.lastTime \+ 1\);\n          this\.lastTime = Date\.now\(\);\n          this\.offset \+= dy; this\._normalize\(\); this\._renderItems\(\); this\._emitValue\(\);\n        }, { passive: false }\);\n        this\.el\.addEventListener\("touchend", \(\) => this\.onUp\(\), { passive: true }\);\n        this\.el\.addEventListener\("touchcancel", \(\) => this\.onUp\(\), { passive: true }\);\n      }\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '      try {\n        this.el.addEventListener("pointerdown", (e) => this.onDown(e));\n        this.el.addEventListener("pointermove", (e) => this.onMove(e));\n        this.el.addEventListener("pointerup", () => this.onUp());\n        this.el.addEventListener("pointercancel", () => this.onUp());\n      } catch(err) {\n        // Fallback for older browsers\n        this.el.addEventListener("mousedown", (e) => this.onDown(e));\n        this.el.addEventListener("mousemove", (e) => this.onMove(e));\n        this.el.addEventListener("mouseup", () => this.onUp());\n        this.el.addEventListener("mouseleave", () => this.onUp());\n\n        this.el.addEventListener("touchstart", (e) => {\n          if (e.touches.length === 1) { this.onDown(e.touches[0]); }\n        }, { passive: false });\n        this.el.addEventListener("touchmove", (e) => {\n          if (!this.isDragging || e.touches.length !== 1) return;\n          e.preventDefault();\n          const dy = e.touches[0].clientY - this.lastY;\n          this.lastY = e.touches[0].clientY;\n          this.velocity = dy / (Date.now() - this.lastTime + 1);\n          this.lastTime = Date.now();\n          this.offset += dy; this._normalize(); this._renderItems(); this._emitValue();\n        }, { passive: false });\n        this.el.addEventListener("touchend", () => this.onUp(), { passive: true });\n        this.el.addEventListener("touchcancel", () => this.onUp(), { passive: true });\n      }\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n      e\.preventDefault\(\);\n      this\.el\.setPointerCapture\(e\.pointerId\);\n=======\n      try { e\.preventDefault\(\); } catch\(_\) {}\n      try { this\.el\.setPointerCapture\(e\.pointerId\); } catch\(_\) {};\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '      try { e.preventDefault(); } catch(_) {}\n      try { this.el.setPointerCapture(e.pointerId); } catch(_) {};\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n  minDrum = new Drum\(drumMinEl, 61, \(val\) => {\n    customMin = val; applyDrumValues\(\);\n  }, \(finalVal\) => {\n    if \(finalVal === 60 && customSec !== 0\) {\n      customSec = 0; if \(secDrum\) secDrum\.scrollToValue\(0, true\); applyDrumValues\(\);\n    }\n    updateUI\(\);\n  }\);\n  secDrum = new Drum\(drumSecEl, 60, \(val\) => {\n    customSec = val; applyDrumValues\(\);\n=======\n  if \(drumMinEl\) {\n    minDrum = new Drum\(drumMinEl, 61, \(val\) => {\n      customMin = val; applyDrumValues\(\);\n    }, \(finalVal\) => {\n      if \(finalVal === 60 && customSec !== 0\) {\n        customSec = 0; if \(secDrum\) secDrum\.scrollToValue\(0, true\); applyDrumValues\(\);\n      }\n      updateUI\(\);\n    }\);\n  }\n  if \(drumSecEl\) {\n    secDrum = new Drum\(drumSecEl, 60, \(val\) => {\n      customSec = val; applyDrumValues\(\);\n    }\);\n  }\n\n  function applyDrumValues\(\) {\n    if \(state === "paused" \|\| state === "finished"\) {\n      clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n      tickTimer = null; finishTimer = null;\n      state = "idle"; lastSpoken = -1;\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '  minDrum = new Drum(drumMinEl, 61, (val) => {\n    customMin = val; applyDrumValues();\n  }, (finalVal) => {\n    if (finalVal === 60 && customSec !== 0) {\n      customSec = 0; if (secDrum) secDrum.scrollToValue(0, true); applyDrumValues();\n    }\n    updateUI();\n  });\n  secDrum = new Drum(drumSecEl, 60, (val) => {\n    customSec = val; applyDrumValues();\n',
    content
)

content = re.sub(
    r'<<<<<<< HEAD\n  document\.getElementById\("swatchPurple"\)\.addEventListener\("click", \(\) => applyPalette\("purple"\)\);\n  document\.getElementById\("swatchGreen"\)\.addEventListener\("click", \(\) => applyPalette\("green"\)\);\n\n  // ── Default gomb ──\n  document\.getElementById\("defaultBtn"\)\.addEventListener\("click", \(\) => {\n    const overlay = document\.createElement\("div"\);\n    overlay\.className = "confirm-overlay";\n    overlay\.innerHTML = `<div class="confirm-box">\n      <p>Visszaállítod az alapértelmezett beállításokat\?</p>\n      <div class="confirm-btns">\n=======\n  const purpleSwatch = document\.getElementById\("swatchPurple"\);\n  const greenSwatch = document\.getElementById\("swatchGreen"\);\n  if \(purpleSwatch\) purpleSwatch\.addEventListener\("click", \(\) => applyPalette\("purple"\)\);\n  if \(greenSwatch\) greenSwatch\.addEventListener\("click", \(\) => applyPalette\("green"\)\);\n\n  // ── Default gomb ──\n  const defBtn = document\.getElementById\("defaultBtn"\);\n  if \(defBtn\) defBtn\.addEventListener\("click", \(\) => {\n    const overlay = document\.createElement\("div"\);\n    overlay\.className = "confirm-overlay";\n    overlay\.innerHTML = `<div class="confirm-box">\n      <p>Visszaállítod az alapértelmezett beállításokat\?</p>\n      <div class="confirm-btns">\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '  document.getElementById("swatchPurple").addEventListener("click", () => applyPalette("purple"));\n  document.getElementById("swatchGreen").addEventListener("click", () => applyPalette("green"));\n\n  // ── Default gomb ──\n  document.getElementById("defaultBtn").addEventListener("click", () => {\n    const overlay = document.createElement("div");\n    overlay.className = "confirm-overlay";\n    overlay.innerHTML = `<div class="confirm-box">\n      <p>Visszaállítod az alapértelmezett beállításokat?</p>\n      <div class="confirm-btns">\n',
    content
)


with open('index.html', 'w') as f:
    f.write(content)

with open('sw.js', 'r') as f:
    sw_content = f.read()

sw_content = re.sub(
    r'<<<<<<< HEAD\nconst CACHE = "stopper-cache";\nconst FILES = \["\./", "\./index\.html", "\./manifest\.json", "\./icon\.svg"\];\n\nself\.addEventListener\("install", e => {\n  self\.skipWaiting\(\);\n  e\.waitUntil\(\n    caches\.open\(CACHE\)\.then\(c => c\.addAll\(FILES\)\)\n  \);\n=======\nconst CACHE = "stopper-v3";\nconst FILES = \[\n  "\./",\n  "\./index\.html",\n  "\./manifest\.json",\n  "\./icon\.svg"\n\];\n\nself\.addEventListener\("install", e => {\n  e\.waitUntil\(caches\.open\(CACHE\)\.then\(c => c\.addAll\(FILES\)\)\);\n  self\.skipWaiting\(\);\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    'const CACHE = "stopper-v3";\nconst FILES = [\n  "./",\n  "./index.html",\n  "./manifest.json",\n  "./icon.svg"\n];\n\nself.addEventListener("install", e => {\n  self.skipWaiting();\n  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));\n',
    sw_content
)

sw_content = re.sub(
    r'<<<<<<< HEAD\n    \)\.then\(\(\) => self\.clients\.claim\(\)\)\n     \.then\(\(\) =>\n      self\.clients\.matchAll\({ type: "window" }\)\.then\(clients =>\n        clients\.forEach\(c => c\.postMessage\({ type: "SW_UPDATED" }\)\)\n      \)\n    \)\n=======\n    \)\n>>>>>>> origin/claude/brave-robust-bordeaux-yVw82\n',
    '    ).then(() => self.clients.claim())\n     .then(() =>\n      self.clients.matchAll({ type: "window" }).then(clients =>\n        clients.forEach(c => c.postMessage({ type: "SW_UPDATED" }))\n      )\n    )\n',
    sw_content
)

with open('sw.js', 'w') as f:
    f.write(sw_content)
