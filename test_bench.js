const fs = require('fs');
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<html><body></body></html>`);
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
    for (let i = 0; i < this.totalItems; i++) {
      const d = document.createElement("div");
      d.className = "drum-item";
      this.track.appendChild(d);
      this.items.push(d);
    }
    this.el.appendChild(this.track);
  }

  _renderItemsCurrent() {
    const newTransform = `translateY(${this.offset}px)`;
    if (this.track._transform !== newTransform) {
      this.track.style.transform = newTransform;
      this.track._transform = newTransform;
    }

    const centerIdx = Math.round((this.SEL_CENTER - this.ITEM_H / 2 - this.offset) / this.ITEM_H);
    const minIdx = Math.max(0, centerIdx - 3);
    const maxIdx = Math.min(this.totalItems - 1, centerIdx + 3);
    const currentVisible = new Set();

    for (let i = minIdx; i <= maxIdx; i++) {
      currentVisible.add(i);
      this.lastVisibleIndices.delete(i);

      const itemCY = this.offset + i * this.ITEM_H + this.ITEM_H / 2;
      const slots = Math.abs(itemCY - this.SEL_CENTER) / this.ITEM_H;
      let op, sc;
      if (slots < 0.5) { op = 1; sc = 1.18; }
      else if (slots < 1.5) { op = 0.55; sc = 1; }
      else if (slots < 2.5) { op = 0.22; sc = 1; }
      else { op = 0.07; sc = 1; }

      const el = this.items[i];
      if (el) {
        if (el._op !== op) { el.style.opacity = op; el._op = op; }
        if (el._sc !== sc) { el.style.transform = `scale(${sc})`; el._sc = sc; }
      }
    }

    for (const i of this.lastVisibleIndices) {
      const el = this.items[i];
      if (el) {
        if (el._op !== 0.07) { el.style.opacity = 0.07; el._op = 0.07; }
        if (el._sc !== 1) { el.style.transform = "scale(1)"; el._sc = 1; }
      }
    }
    this.lastVisibleIndices = currentVisible;
  }

  _renderItemsClassBased() {
    const newTransform = `translateY(${this.offset}px)`;
    if (this.track._transform !== newTransform) {
      this.track.style.transform = newTransform;
      this.track._transform = newTransform;
    }

    const centerIdx = Math.round((this.SEL_CENTER - this.ITEM_H / 2 - this.offset) / this.ITEM_H);
    const minIdx = Math.max(0, centerIdx - 3);
    const maxIdx = Math.min(this.totalItems - 1, centerIdx + 3);
    const currentVisible = new Set();

    for (let i = minIdx; i <= maxIdx; i++) {
      currentVisible.add(i);
      this.lastVisibleIndices.delete(i);

      const itemCY = this.offset + i * this.ITEM_H + this.ITEM_H / 2;
      const slots = Math.abs(itemCY - this.SEL_CENTER) / this.ITEM_H;
      let cls = "drum-item";
      if (slots < 0.5) { cls = "drum-item slot-0"; }
      else if (slots < 1.5) { cls = "drum-item slot-1"; }
      else if (slots < 2.5) { cls = "drum-item slot-2"; }

      const el = this.items[i];
      if (el && el._cls !== cls) {
        el.className = cls;
        el._cls = cls;
      }
    }

    for (const i of this.lastVisibleIndices) {
      const el = this.items[i];
      if (el && el._cls !== "drum-item") {
        el.className = "drum-item";
        el._cls = "drum-item";
      }
    }
    this.lastVisibleIndices = currentVisible;
  }
}

const drumCur = new DrumMock(document.createElement("div"), 60);
const drumCls = new DrumMock(document.createElement("div"), 60);

const ITERATIONS = 100000;
let offsets = [];
for (let i = 0; i < ITERATIONS; i++) {
  offsets.push((Math.sin(i / 100) * 1000) - 500);
}

let start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  drumCur.offset = offsets[i];
  drumCur._renderItemsCurrent();
}
let end = performance.now();
console.log(`Current:  ${(end - start).toFixed(2)} ms`);

start = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  drumCls.offset = offsets[i];
  drumCls._renderItemsClassBased();
}
end = performance.now();
console.log(`ClassBased: ${(end - start).toFixed(2)} ms`);
