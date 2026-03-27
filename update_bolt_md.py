import sys

with open('.jules/bolt.md', 'w') as f:
    f.write("""## 2024-03-26 - [Unnecessary Layout Thrashing in Global Pointer Events]
**Learning:** In the monolithic Stopper app, binding `pointermove` globally or to a large area (`#clock-wrap`) and unconditionally calling DOM layout queries like `getBoundingClientRect()` and `clientWidth`/`clientHeight` causes continuous synchronous layout thrashing (forced reflows) during idle mouse hovering. This degrades 60fps rendering, especially on mobile.
**Action:** Always add early returns for idle states (e.g. `if (!dragReady && !dragActive) return;`) before accessing layout properties in continuous event listeners.
""")
