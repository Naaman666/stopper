const { presetLabel } = require('../js/utils');

const tests = [
  { input: { min: 5, sec: 0 }, expected: "5:00", name: "Valid preset (5:00)" },
  { input: { min: 0, sec: 30 }, expected: "0:30", name: "Valid preset (0:30)" },
  { input: null, expected: "–", name: "Null input" },
  { input: undefined, expected: "–", name: "Undefined input" },
  { input: {}, expected: "–", name: "Empty object" },
  { input: { min: 5 }, expected: "–", name: "Missing sec" },
  { input: { sec: 30 }, expected: "–", name: "Missing min" },
  { input: { min: null, sec: 30 }, expected: "–", name: "Null min property" }
];

let failedCount = 0;
tests.forEach(test => {
  try {
    const result = presetLabel(test.input);
    if (result === test.expected) {
      console.log(`✅ PASSED: ${test.name}`);
    } else {
      console.log(`❌ FAILED: ${test.name} | Expected: "${test.expected}", Got: "${result}"`);
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
