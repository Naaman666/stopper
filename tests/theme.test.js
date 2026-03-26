const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Theme Management', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Setup globals needed by index.html before loading it
    dom = new JSDOM(html, {
      runScripts: "dangerously",
      url: "http://localhost",
      beforeParse(window) {
        // Mock speechSynthesis
        window.speechSynthesis = {
          speak: jest.fn(),
          cancel: jest.fn(),
          getVoices: jest.fn().mockReturnValue([]),
          addEventListener: jest.fn()
        };
        window.SpeechSynthesisUtterance = jest.fn();

        // Mock ResizeObserver
        window.ResizeObserver = jest.fn().mockImplementation(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        }));
      }
    });
    document = dom.window.document;
    window = dom.window;
  });

  afterEach(() => {
    // Clear localStorage and DOM between tests to ensure a clean slate
    window.localStorage.clear();
    dom.window.close();
  });

  it('should initialize with light theme by default', () => {
    // Check initial state
    expect(document.documentElement.getAttribute('data-theme')).toBeFalsy();
    expect(document.getElementById('themeBtn').textContent).toBe('Sötét');
    // Notice that when it initializes, it explicitly saves 'light' or 'dark' in localStorage via `setTheme` which might be called on init.
    // So if it's 'light', it can be 'light' or null if not yet saved, depending on init logic.
    // Looking at index.html: `setTheme(isDark);` is called on init, and since `isDark` is false initially,
    // it executes: localStorage.setItem("stopper_theme", dark ? "dark" : "light");
    expect(window.localStorage.getItem('stopper_theme')).toBe('light');
  });

  it('should toggle theme when theme button is clicked', () => {
    const themeBtn = document.getElementById('themeBtn');

    // Switch to dark mode
    themeBtn.click();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(themeBtn.textContent).toBe('Világos');
    expect(themeBtn.getAttribute('aria-pressed')).toBe('true');
    expect(window.localStorage.getItem('stopper_theme')).toBe('dark');

    // Switch back to light mode
    themeBtn.click();

    expect(document.documentElement.getAttribute('data-theme')).toBe('');
    expect(themeBtn.textContent).toBe('Sötét');
    expect(themeBtn.getAttribute('aria-pressed')).toBe('false');
    expect(window.localStorage.getItem('stopper_theme')).toBe('light');
  });

  it('should restore theme from localStorage on load', () => {
    // We need a fresh DOM where localStorage is populated *before* scripts run
    const customDom = new JSDOM(html, {
      runScripts: "dangerously",
      url: "http://localhost",
      beforeParse(win) {
        win.localStorage.setItem('stopper_theme', 'dark');

        // Setup same mocks as before
        win.speechSynthesis = {
          speak: jest.fn(),
          cancel: jest.fn(),
          getVoices: jest.fn().mockReturnValue([]),
          addEventListener: jest.fn()
        };
        win.SpeechSynthesisUtterance = jest.fn();
        win.ResizeObserver = jest.fn().mockImplementation(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        }));
      }
    });

    const customDoc = customDom.window.document;

    // Check if dark theme is applied immediately on load
    expect(customDoc.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(customDoc.getElementById('themeBtn').textContent).toBe('Világos');

    // Clean up
    customDom.window.close();
  });
});
