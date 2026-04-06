const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

const newFunction = `
  function clearTimers() {
    clearTimeout(tickTimer); clearTimeout(finishTimer);
    tickTimer = null; finishTimer = null;
  }
`;

// Insert the new clearTimers function right before stopTimer
html = html.replace(
  "  function stopTimer() {",
  newFunction + "\n  function stopTimer() {",
);

// Replace in resetToIdle
html = html.replace(
  `  function resetToIdle() {
    clearTimeout(tickTimer); clearTimeout(finishTimer);
    tickTimer = null; finishTimer = null;
    state = "idle"; timeLeft = totalSec; lastSpoken = -1;
    renderClock(); updateUI();
  }`,
  `  function resetToIdle() {
    clearTimers();
    state = "idle"; timeLeft = totalSec; lastSpoken = -1;
    renderClock(); updateUI();
  }`,
);

// Replace in setDuration
html = html.replace(
  `    if (state === "paused" || state === "finished") {
      clearTimeout(tickTimer); clearTimeout(finishTimer);
      tickTimer = null; finishTimer = null;
      state = "idle"; lastSpoken = -1;
    }`,
  `    if (state === "paused" || state === "finished") {
      clearTimers();
      state = "idle"; lastSpoken = -1;
    }`,
);

// Replace in applyDrumValues
html = html.replace(
  `    if (state === "paused" || state === "finished") {
      clearTimeout(tickTimer); clearTimeout(finishTimer);
      tickTimer = null; finishTimer = null;
      state = "idle"; lastSpoken = -1;
    }`,
  `    if (state === "paused" || state === "finished") {
      clearTimers();
      state = "idle"; lastSpoken = -1;
    }`,
);

fs.writeFileSync("index.html", html);
console.log("index.html updated successfully");
