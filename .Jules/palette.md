## 2024-03-24 - Accessibility for dynamic modal
**Learning:** When generating modals/overlays dynamically via JS (e.g., using `innerHTML` and `appendChild`), simply creating the DOM elements isn't enough for accessibility. Custom dialogs injected this way often miss `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes. Furthermore, a screen reader user (or keyboard user) will be left at their original location on the page unless focus is explicitly moved into the modal immediately after rendering.
**Action:** Always ensure that dynamically injected modals receive proper ARIA dialog attributes and that a safe interactive element within the modal (like a 'Cancel' or 'No' button) receives `.focus()` right after insertion.

## 2024-03-26 - Added ARIA labels to confirm dialog buttons

**Learning:** A megerősítő párbeszédpanelek dinamikus létrehozásánál is figyelnünk
kell az akadálymentesítésre. Az 'Igen'/'Nem' gombok a kontextusból
egyértelműek a látó felhasználók számára, de a képernyőolvasók
számára csak annyit mondanak: 'Igen, gomb'. Emiatt kiegészítettem őket
`aria-label`-lel, amely elmagyarázza, hogy mi történik, ha
rákattintunk (pl. 'Igen, alapértelmezések visszaállítása'). Emellett a
tároló elemhez (container) hozzáadtam a `role="dialog"` és
`aria-modal="true"` attribútumokat a teljesebb hozzáférhetőség érdekében.

**Action:** A jövőben minden dinamikusan generált, kontextusfüggő gombnál (pl.
mentés, törlés, visszaállítás megerősítése) ellenőrizzük és
egészítsük ki az `aria-label` attribútummal.