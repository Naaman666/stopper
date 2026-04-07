/**
 * Formats a preset object into a string label (e.g., "5:00").
 * Returns a fallback character if the preset or its properties are missing.
 *
 * @param {Object} p - The preset object { min, sec }.
 * @returns {string} The formatted label or "–" as fallback.
 */
function presetLabel(p) {
  if (!p || p.min == null || p.sec == null) return "–";
  return `${p.min}:${String(p.sec).padStart(2, "0")}`;
}

/**
 * Validates and normalizes duration parts (minutes and seconds).
 *
 * @param {string|number} minValue - The minutes value.
 * @param {string|number} secValue - The seconds value.
 * @returns {Object|null} The normalized { min, sec } object or null if invalid.
 */
function normalizeDurationParts(minValue, secValue) {
  const min = Number.parseInt(minValue, 10);
  const sec = Number.parseInt(secValue, 10);
  if (
    !Number.isInteger(min) ||
    !Number.isInteger(sec) ||
    min < 0 ||
    min > 60 ||
    sec < 0 ||
    sec > 59
  ) {
    return null;
  }
  if (min === 60 && sec !== 0) return null;
  return { min, sec };
}

/**
 * Normalizes a preset entry object.
 *
 * @param {Object} entry - The preset entry { min, sec }.
 * @returns {Object|null} The normalized { min, sec } object or null if invalid.
 */
function normalizePresetEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  return normalizeDurationParts(entry.min, entry.sec);
}

// Export for Node.js testing environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    presetLabel,
    normalizeDurationParts,
    normalizePresetEntry,
  };
}
