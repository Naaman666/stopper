from playwright.sync_api import sync_playwright
import os
import time

def test_initial_state(page):
    print("Test 1: Initial state")
    assert page.evaluate("window.__test.state") == "idle"
    assert page.evaluate("window.__test.totalSec") == 60
    assert page.evaluate("window.__test.timeLeft") == 60
    assert page.evaluate("window.__test.customMin") == 1
    assert page.evaluate("window.__test.customSec") == 0
    print("  Passed")

def test_set_duration_idle(page):
    print("Test 2: setDuration in idle")
    page.evaluate("window.__test.setDuration(150)")
    assert page.evaluate("window.__test.state") == "idle"
    assert page.evaluate("window.__test.totalSec") == 150
    assert page.evaluate("window.__test.timeLeft") == 150
    assert page.evaluate("window.__test.customMin") == 2
    assert page.evaluate("window.__test.customSec") == 30
    print("  Passed")

def test_set_duration_running_should_ignore(page):
    print("Test 3: setDuration while running (should be ignored)")
    page.evaluate("window.__test.startTimer()")
    assert page.evaluate("window.__test.state") == "running"
    page.evaluate("window.__test.setDuration(120)")
    assert page.evaluate("window.__test.totalSec") == 60
    assert page.evaluate("window.__test.state") == "running"
    print("  Passed")

def test_set_duration_paused_should_reset_to_idle(page):
    print("Test 4: setDuration while paused (should reset to idle)")
    page.evaluate("window.__test.startTimer()")
    page.evaluate("window.__test.stopTimer()")
    assert page.evaluate("window.__test.state") == "paused"
    page.evaluate("window.__test.setDuration(120)")
    assert page.evaluate("window.__test.state") == "idle"
    assert page.evaluate("window.__test.totalSec") == 120
    assert page.evaluate("window.__test.timeLeft") == 120
    print("  Passed")

def test_set_duration_finished_should_reset_to_idle(page):
    print("Test 5: setDuration while finished (should reset to idle)")
    page.evaluate("window.__test.setDuration(1)")
    page.evaluate("window.__test.startTimer()")
    time.sleep(2)
    assert page.evaluate("window.__test.state") == "finished"
    page.evaluate("window.__test.setDuration(300)")
    assert page.evaluate("window.__test.state") == "idle"
    assert page.evaluate("window.__test.totalSec") == 300
    assert page.evaluate("window.__test.timeLeft") == 300
    print("  Passed")

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        path = os.path.abspath("index.html")

        def get_page():
            page = browser.new_page()
            page.goto(f"file://{path}")
            page.wait_for_selector("#clock-wrap")
            return page

        test_initial_state(get_page())
        test_set_duration_idle(get_page())
        test_set_duration_running_should_ignore(get_page())
        test_set_duration_paused_should_reset_to_idle(get_page())
        test_set_duration_finished_should_reset_to_idle(get_page())

        browser.close()

if __name__ == "__main__":
    try:
        run_tests()
        print("\nAll tests passed successfully!")
    except Exception as e:
        import traceback
        traceback.print_exc()
        exit(1)
