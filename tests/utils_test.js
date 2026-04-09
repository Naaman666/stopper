const {
  presetLabel,
  normalizeDurationParts,
  normalizePresetEntry,
  findHuVoice,
} = require("../js/utils");

// Utility for deep comparing objects in tests
const isSame = (a, b) => {
  if (a === b) return true;
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  if (typeof a === "object" && typeof b === "object") {
    return a.min === b.min && a.sec === b.sec;
  }
  return false;
};

const tests = [
  // --- normalizeDurationParts Tests ---
  // Happy paths
  {
    fn: normalizeDurationParts,
    input: [5, 30],
    expected: { min: 5, sec: 30 },
    name: "normalizeDurationParts: Valid duration (5:30)",
  },
  {
    fn: normalizeDurationParts,
    input: [0, 0],
    expected: { min: 0, sec: 0 },
    name: "normalizeDurationParts: Valid duration (0:00)",
  },
  {
    fn: normalizeDurationParts,
    input: [60, 0],
    expected: { min: 60, sec: 0 },
    name: "normalizeDurationParts: Maximum valid duration (60:00)",
  },
  {
    fn: normalizeDurationParts,
    input: ["12", "45"],
    expected: { min: 12, sec: 45 },
    name: "normalizeDurationParts: String values converted to numbers",
  },
  {
    fn: normalizeDurationParts,
    input: [" 5 ", " 0 "],
    expected: { min: 5, sec: 0 },
    name: "normalizeDurationParts: String values with spaces",
  },
  {
    fn: normalizeDurationParts,
    input: [5.5, 30.9],
    expected: { min: 5, sec: 30 },
    name: "normalizeDurationParts: Floats are truncated to integers",
  },

  // Error / Validation paths
  {
    fn: normalizeDurationParts,
    input: [-1, 30],
    expected: null,
    name: "normalizeDurationParts: Negative min",
  },
  {
    fn: normalizeDurationParts,
    input: [5, -1],
    expected: null,
    name: "normalizeDurationParts: Negative sec",
  },
  {
    fn: normalizeDurationParts,
    input: [61, 0],
    expected: null,
    name: "normalizeDurationParts: Min exceeds maximum (61)",
  },
  {
    fn: normalizeDurationParts,
    input: [5, 60],
    expected: null,
    name: "normalizeDurationParts: Sec exceeds maximum (60)",
  },
  {
    fn: normalizeDurationParts,
    input: [60, 1],
    expected: null,
    name: "normalizeDurationParts: Sec not zero when min is 60",
  },
  {
    fn: normalizeDurationParts,
    input: ["abc", 30],
    expected: null,
    name: "normalizeDurationParts: Non-numeric min string",
  },
  {
    fn: normalizeDurationParts,
    input: [5, "xyz"],
    expected: null,
    name: "normalizeDurationParts: Non-numeric sec string",
  },
  {
    fn: normalizeDurationParts,
    input: [null, 30],
    expected: null,
    name: "normalizeDurationParts: Null min",
  },
  {
    fn: normalizeDurationParts,
    input: [5, null],
    expected: null,
    name: "normalizeDurationParts: Null sec",
  },
  {
    fn: normalizeDurationParts,
    input: [undefined, undefined],
    expected: null,
    name: "normalizeDurationParts: Undefined inputs",
  },
  {
    fn: normalizeDurationParts,
    input: ["", ""],
    expected: null,
    name: "normalizeDurationParts: Empty strings",
  },
  {
    fn: normalizeDurationParts,
    input: [NaN, 30],
    expected: null,
    name: "normalizeDurationParts: NaN min",
  },
  {
    fn: normalizeDurationParts,
    input: [5, NaN],
    expected: null,
    name: "normalizeDurationParts: NaN sec",
  },
  {
    fn: normalizeDurationParts,
    input: [true, false],
    expected: null,
    name: "normalizeDurationParts: Boolean types",
  },
  {
    fn: normalizeDurationParts,
    input: [[], {}],
    expected: null,
    name: "normalizeDurationParts: Array and Object types",
  },
  {
    fn: normalizeDurationParts,
    input: [Infinity, 30],
    expected: null,
    name: "normalizeDurationParts: Infinity min",
  },
  {
    fn: normalizeDurationParts,
    input: [5, -Infinity],
    expected: null,
    name: "normalizeDurationParts: Negative Infinity sec",
  },

  // --- presetLabel Tests ---
  {
    fn: presetLabel,
    input: [{ min: 5, sec: 30 }],
    expected: "5:30",
    name: "presetLabel: Valid preset (5:30)",
  },
  {
    fn: presetLabel,
    input: [{ min: 12, sec: 5 }],
    expected: "12:05",
    name: "presetLabel: Valid preset (sec padded)",
  },
  {
    fn: presetLabel,
    input: [{ min: 0, sec: 0 }],
    expected: "0:00",
    name: "presetLabel: Valid preset (0:00)",
  },
  {
    fn: presetLabel,
    input: [null],
    expected: "–",
    name: "presetLabel: Null input",
  },
  {
    fn: presetLabel,
    input: [undefined],
    expected: "–",
    name: "presetLabel: Undefined input",
  },
  {
    fn: presetLabel,
    input: [{}],
    expected: "–",
    name: "presetLabel: Empty object",
  },
  {
    fn: presetLabel,
    input: [{ min: 5 }],
    expected: "–",
    name: "presetLabel: Missing sec",
  },
  {
    fn: presetLabel,
    input: [{ sec: 30 }],
    expected: "–",
    name: "presetLabel: Missing min",
  },
  {
    fn: presetLabel,
    input: [{ min: null, sec: null }],
    expected: "–",
    name: "presetLabel: Null min and sec",
  },

  // --- normalizePresetEntry Tests ---
  {
    fn: normalizePresetEntry,
    input: [{ min: 5, sec: 30 }],
    expected: { min: 5, sec: 30 },
    name: "normalizePresetEntry: Valid preset entry",
  },
  {
    fn: normalizePresetEntry,
    input: [{ min: "10", sec: "0" }],
    expected: { min: 10, sec: 0 },
    name: "normalizePresetEntry: Valid entry with string numbers",
  },
  {
    fn: normalizePresetEntry,
    input: [null],
    expected: null,
    name: "normalizePresetEntry: Null entry",
  },
  {
    fn: normalizePresetEntry,
    input: [undefined],
    expected: null,
    name: "normalizePresetEntry: Undefined entry",
  },
  {
    fn: normalizePresetEntry,
    input: ["string"],
    expected: null,
    name: "normalizePresetEntry: String instead of object",
  },
  {
    fn: normalizePresetEntry,
    input: [123],
    expected: null,
    name: "normalizePresetEntry: Number instead of object",
  },
  {
    fn: normalizePresetEntry,
    input: [{ min: -5, sec: 10 }],
    expected: null,
    name: "normalizePresetEntry: Invalid internal values (negative)",
  },
  {
    fn: normalizePresetEntry,
    input: [{ min: "abc", sec: 10 }],
    expected: null,
    name: "normalizePresetEntry: Invalid internal values (NaN)",
  },

  // --- findHuVoice Tests ---
  {
    fn: findHuVoice,
    input: [{ getVoices: () => [{ lang: "en-US" }, { lang: "hu-HU" }] }],
    expected: { lang: "hu-HU" },
    name: "findHuVoice: Finds Hungarian voice",
  },
  {
    fn: findHuVoice,
    input: [{ getVoices: () => [{ lang: "en-US" }] }],
    expected: null,
    name: "findHuVoice: No Hungarian voice available",
  },
  {
    fn: findHuVoice,
    input: [{ getVoices: () => [] }],
    expected: null,
    name: "findHuVoice: Empty voices array",
  },
  {
    fn: findHuVoice,
    input: [
      { getVoices: () => [{ name: "No Lang Voice" }, { lang: "en-US" }] },
    ],
    expected: null,
    name: "findHuVoice: Handles voices without 'lang' property",
  },
  {
    fn: findHuVoice,
    input: [
      {
        getVoices: () => {
          const arr = [];
          arr.find = () => undefined;
          return arr;
        },
      },
    ],
    expected: null,
    name: "findHuVoice: Fallback condition when Array.prototype.find returns undefined",
  },
  {
    fn: findHuVoice,
    input: [null],
    expected: null,
    name: "findHuVoice: Null SpeechSynthesis instance",
  },
  {
    fn: findHuVoice,
    input: [{}],
    expected: null,
    name: "findHuVoice: Missing getVoices method",
  },
];

let failedCount = 0;

tests.forEach((test) => {
  try {
    const result = test.fn(...test.input);

    let matched = false;
    if (test.fn === presetLabel) {
      matched = result === test.expected;
    } else if (test.fn === findHuVoice) {
      matched = result
        ? result.lang === test.expected?.lang
        : result === test.expected;
    } else {
      matched = isSame(result, test.expected);
    }

    if (matched) {
      console.log(`✅ PASSED: ${test.name}`);
    } else {
      console.log(
        `❌ FAILED: ${test.name} | Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(result)}`,
      );
      failedCount++;
    }
  } catch (e) {
    console.log(`❌ CRASHED: ${test.name} | Error: ${e.message}`);
    failedCount++;
  }
});

if (failedCount > 0) {
  console.log(`\nTotal ${failedCount} tests failed.`);
  // eslint-disable-next-line no-undef
  process.exit(1);
} else {
  console.log("\nAll tests passed successfully!");
  // eslint-disable-next-line no-undef
  process.exit(0);
}
