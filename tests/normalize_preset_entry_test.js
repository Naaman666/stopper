const { normalizePresetEntry } = require("../js/utils");

// Test cases definition
const tests = [
  // Happy paths
  {
    input: { min: 5, sec: 30 },
    expected: { min: 5, sec: 30 },
    name: "Valid preset (5:30)",
  },
  {
    input: { min: 0, sec: 0 },
    expected: { min: 0, sec: 0 },
    name: "Valid preset (0:00)",
  },
  {
    input: { min: 60, sec: 0 },
    expected: { min: 60, sec: 0 },
    name: "Maximum valid preset (60:00)",
  },

  // Numbers converted from strings
  {
    input: { min: "12", sec: "45" },
    expected: { min: 12, sec: 45 },
    name: "String values converted to numbers",
  },
  {
    input: { min: " 5 ", sec: " 0 " },
    expected: { min: 5, sec: 0 },
    name: "String values with spaces converted to numbers",
  },

  // Invalid non-object inputs
  { input: null, expected: null, name: "Null input" },
  { input: undefined, expected: null, name: "Undefined input" },
  { input: "string", expected: null, name: "String input" },
  { input: 123, expected: null, name: "Number input" },
  {
    input: [],
    expected: null,
    name: "Array input (technically object but misses properties)",
  },

  // Missing properties (NaN leads to null)
  { input: {}, expected: null, name: "Empty object" },
  { input: { min: 5 }, expected: null, name: "Missing sec property" },
  { input: { sec: 30 }, expected: null, name: "Missing min property" },
  { input: { min: null, sec: 30 }, expected: null, name: "Null min property" },

  // Out of bounds values
  { input: { min: -1, sec: 30 }, expected: null, name: "Negative min" },
  { input: { min: 5, sec: -1 }, expected: null, name: "Negative sec" },
  {
    input: { min: 61, sec: 0 },
    expected: null,
    name: "Min exceeds maximum (61)",
  },
  {
    input: { min: 5, sec: 60 },
    expected: null,
    name: "Sec exceeds maximum (60)",
  },

  // Special case: If min is 60, sec must be 0
  {
    input: { min: 60, sec: 1 },
    expected: null,
    name: "Sec not zero when min is 60",
  },

  // Non-number (NaN) values
  {
    input: { min: "abc", sec: 30 },
    expected: null,
    name: "Non-numeric min string",
  },
  {
    input: { min: 5, sec: "xyz" },
    expected: null,
    name: "Non-numeric sec string",
  },
];

let failedCount = 0;
tests.forEach((test) => {
  try {
    const result = normalizePresetEntry(test.input);

    // Deep comparison of two objects
    const isSame = (a, b) => {
      if (a === b) return true;
      if (a === null && b === null) return true;
      if (a === null || b === null) return false;
      return a.min === b.min && a.sec === b.sec;
    };

    if (isSame(result, test.expected)) {
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
  process.exit(1);
} else {
  console.log("\nAll tests passed successfully!");
  process.exit(0);
}
