const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html);
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.performance = { now: () => Date.now() };

class DrumMock {
  constructor(el, count) {
    this.el = el;
    this.count = count;
    this.totalItems = count * 5;
    this.offset = 0;
    this.items = [];
    this.lastVisibleIndices = new Set();

    this.ITEM_H = 50;
    this.SEL_CENTER = 75;

    this.build();
  }

  build() {
    this.track = document.createElement("div");
    this.track.className = "drum-track";
    for (let i = 0; i < this.totalItems; i++) {
      const d = document.createElement("div");
      d.className = "drum-item";
      d.textContent = String(i % this.count).padStart(2, "0");
      this.track.appendChild(d);
      this.items.push(d);
    }
    this.el.appendChild(this.track);
  }

  _renderItemsOriginal() {
    this.track.style.transform = `translateY(${this.offset}px)`;

    const ITEM_H = this.ITEM_H;
    const SEL_CENTER = this.SEL_CENTER;

    const centerIdx = Math.round(
      (SEL_CENTER - ITEM_H / 2 - this.offset) / ITEM_H,
    );
    const minIdx = Math.max(0, centerIdx - 3);
    const maxIdx = Math.min(this.totalItems - 1, centerIdx + 3);

    const currentVisible = new Set();

    for (let i = minIdx; i <= maxIdx; i++) {
      currentVisible.add(i);
      this.lastVisibleIndices.delete(i);

      const itemCY = this.offset + i * ITEM_H + ITEM_H / 2;
      const slots = Math.abs(itemCY - SEL_CENTER) / ITEM_H;
      let op, sc;
      if (slots < 0.5) {
        op = 1;
        sc = 1.18;
      } else if (slots < 1.5) {
        op = 0.55;
        sc = 1;
      } else if (slots < 2.5) {
        op = 0.22;
        sc = 1;
      } else {
        op = 0.07;
        sc = 1;
      }

      const el = this.items[i];
      if (el) {
        el.style.opacity = op;
        el.style.transform = `scale(${sc})`;
      }
    }

    for (const i of this.lastVisibleIndices) {
      const el = this.items[i];
      if (el) {
        el.style.opacity = 0.07;
        el.style.transform = "scale(1)";
      }
    }

    this.lastVisibleIndices = currentVisible;
  }

  _renderItemsOptimized() {
    const newTransform = `translateY(${this.offset}px)`;
    if (this.track._transform !== newTransform) {
      this.track.style.transform = newTransform;
      this.track._transform = newTransform;
    }

    const ITEM_H = this.ITEM_H;
    const SEL_CENTER = this.SEL_CENTER;

    const centerIdx = Math.round(
      (SEL_CENTER - ITEM_H / 2 - this.offset) / ITEM_H,
    );
    const minIdx = Math.max(0, centerIdx - 3);
    const maxIdx = Math.min(this.totalItems - 1, centerIdx + 3);

    const currentVisible = new Set();

    for (let i = minIdx; i <= maxIdx; i++) {
      currentVisible.add(i);
      this.lastVisibleIndices.delete(i);

      const itemCY = this.offset + i * ITEM_H + ITEM_H / 2;
      const slots = Math.abs(itemCY - SEL_CENTER) / ITEM_H;
      let op, sc;
      if (slots < 0.5) {
        op = 1;
        sc = 1.18;
      } else if (slots < 1.5) {
        op = 0.55;
        sc = 1;
      } else if (slots < 2.5) {
        op = 0.22;
        sc = 1;
      } else {
        op = 0.07;
        sc = 1;
      }

      const el = this.items[i];
      if (el) {
        if (el._op !== op) {
          el.style.opacity = op;
          el._op = op;
        }
        if (el._sc !== sc) {
          el.style.transform = `scale(${sc})`;
          el._sc = sc;
        }
      }
    }

    for (const i of this.lastVisibleIndices) {
      const el = this.items[i];
      if (el) {
        if (el._op !== 0.07) {
          el.style.opacity = 0.07;
          el._op = 0.07;
        }
        if (el._sc !== 1) {
          el.style.transform = "scale(1)";
          el._sc = 1;
        }
      }
    }

    this.lastVisibleIndices = currentVisible;
  }
}

const drumEl = document.createElement("div");
const drumOrig = new DrumMock(drumEl, 60);

const drumEl2 = document.createElement("div");
const drumOpt = new DrumMock(drumEl2, 60);

const ITERATIONS = 100000;
let offsets = [];
for (let i = 0; i < ITERATIONS; i++) {
  offsets.push((Math.sin(i / 100) * 1000) - 500);
}

console.log(`Running benchmark with ${ITERATIONS} iterations...`);

let start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  drumOrig.offset = offsets[i];
  drumOrig._renderItemsOriginal();
}
let end = performance.now();
const origTime = end - start;
console.log(`Original:  ${origTime.toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  drumOpt.offset = offsets[i];
  drumOpt._renderItemsOptimized();
}
end = performance.now();
const optTime = end - start;
console.log(`Optimized: ${optTime.toFixed(2)} ms`);
console.log(`Improvement: ${((origTime - optTime) / origTime * 100).toFixed(2)}% (${(origTime / optTime).toFixed(2)}x faster)`);
