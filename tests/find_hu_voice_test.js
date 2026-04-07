const { findHuVoice } = require("../js/utils");

// Mocking the SpeechSynthesis API for testing
const createMockSynth = (voices = []) => ({
  getVoices: () => voices,
});

const mockVoiceHu = { lang: "hu-HU", name: "Hungarian Voice" };
const mockVoiceHuShort = { lang: "hu", name: "Hungarian Voice Short" };
const mockVoiceEn = { lang: "en-US", name: "English Voice" };
const mockVoiceNoLang = { name: "No Lang Voice" };

const tests = [
  {
    input: createMockSynth([mockVoiceEn, mockVoiceHu, mockVoiceEn]),
    expected: mockVoiceHu,
    name: "Finds 'hu-HU' voice",
  },
  {
    input: createMockSynth([mockVoiceEn, mockVoiceHuShort]),
    expected: mockVoiceHuShort,
    name: "Finds 'hu' voice",
  },
  {
    input: createMockSynth([mockVoiceEn]),
    expected: null,
    name: "Returns null when no Hungarian voice is present",
  },
  {
    input: createMockSynth([]),
    expected: null,
    name: "Returns null for empty voices array",
  },
  {
    input: createMockSynth([mockVoiceNoLang, mockVoiceEn]),
    expected: null,
    name: "Handles voices without 'lang' property",
  },
  {
    input: createMockSynth([mockVoiceNoLang, mockVoiceHu]),
    expected: mockVoiceHu,
    name: "Finds 'hu' voice even if previous voice has no lang property",
  },
  {
    input: null,
    expected: null,
    name: "Handles null synth object",
  },
  {
    input: undefined,
    expected: null,
    name: "Handles undefined synth object",
  },
  {
    input: {},
    expected: null,
    name: "Handles synth object missing getVoices function",
  },
  {
    input: createMockSynth([
      { lang: "fr-FR", name: "French Voice" },
      { lang: "de-DE", name: "German Voice" },
      { lang: "es-ES", name: "Spanish Voice" },
    ]),
    expected: null,
    name: "Tests fallback condition (|| null) when getVoices returns an array with no Hungarian voice",
  },
];

let failedCount = 0;
tests.forEach((test) => {
  try {
    const result = findHuVoice(test.input);
    if (result === test.expected) {
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
