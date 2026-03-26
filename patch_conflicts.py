import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace block 1
content = re.sub(
    r'<<<<<<< HEAD\n  const clockArea = document\.querySelector\("\.clock-area"\);\n=======\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n',
    '  const clockArea = document.querySelector(".clock-area");\n',
    content
)

# Replace block 2
content = re.sub(
    r'<<<<<<< HEAD\n    if \(clockArea\) {\n      const h = clockArea\.clientHeight;\n      const w = clockArea\.clientWidth;\n=======\n    const area = document\.querySelector\("\.clock-area"\);\n    if \(area\) {\n      const h = area\.clientHeight;\n      const w = area\.clientWidth;\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n',
    '    if (clockArea) {\n      const h = clockArea.clientHeight;\n      const w = clockArea.clientWidth;\n',
    content
)

# Replace block 3
content = re.sub(
    r'<<<<<<< HEAD\n  function clearTimers\(\) {\n    clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n    tickTimer = null; finishTimer = null;\n  }\n\n  function resetToIdleState\(\) {\n    clearTimers\(\);\n    state = "idle"; lastSpoken = -1;\n  }\n\n',
    '  function clearTimers() {\n    clearTimeout(tickTimer); clearTimeout(finishTimer);\n    tickTimer = null; finishTimer = null;\n  }\n\n  function resetToIdleState() {\n    clearTimers();\n    state = "idle"; lastSpoken = -1;\n  }\n\n',
    content
)

# Replace block 4
content = re.sub(
    r'<<<<<<< HEAD\n      resetToIdleState\(\);\n=======\n      clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n      tickTimer = null; finishTimer = null;\n      state = "idle"; lastSpoken = -1;\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n',
    '      resetToIdleState();\n',
    content
)

# Replace block 5
content = re.sub(
    r'<<<<<<< HEAD\n      resetToIdleState\(\);\n=======\n      clearTimeout\(tickTimer\); clearTimeout\(finishTimer\);\n      tickTimer = null; finishTimer = null;\n      state = "idle"; lastSpoken = -1;\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n',
    '      resetToIdleState();\n',
    content
)

# Replace block 6
content = re.sub(
    r'<<<<<<< HEAD\n=======\n  const clockArea = document\.querySelector\("\.clock-area"\);\n>>>>>>> origin/claude/add-playwright-timer-tests-4758945369209004684\n',
    '',
    content
)

with open('index.html', 'w') as f:
    f.write(content)
