import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

search = """  document.getElementById("defaultBtn").addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `<div class="confirm-box">
      <p>Visszaállítod az alapértelmezett beállításokat?</p>
      <div class="confirm-btns">
        <button class="confirm-yes">Igen</button>
        <button class="confirm-no">Nem</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector(".confirm-no").addEventListener("click", () => overlay.remove());"""

replace = """  document.getElementById("defaultBtn").addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <p id="confirm-title">Visszaállítod az alapértelmezett beállításokat?</p>
      <div class="confirm-btns">
        <button class="confirm-yes">Igen</button>
        <button class="confirm-no">Nem</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector(".confirm-no").focus();
    overlay.querySelector(".confirm-no").addEventListener("click", () => overlay.remove());"""

new_content = content.replace(search, replace)

if new_content != content:
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Módosítás sikeres.")
else:
    print("Nem találtam meg a szöveget.")
