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

// Export for Node.js testing environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { presetLabel };
}
