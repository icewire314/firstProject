// test-clear-button.js — verifies the Clear toolbar button in index.html
'use strict';

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  PASS  ${description}`);
    passed++;
  } else {
    console.error(`  FAIL  ${description}`);
    failed++;
  }
}

console.log('Clear button tests\n');

// HTML: button element
assert('#btn-clear button element exists in toolbar', /<button[^>]+id="btn-clear"/.test(html));
assert('#btn-clear has label text "Clear"', /<button[^>]+id="btn-clear"[^>]*>Clear<\/button>/.test(html));
assert('#btn-clear is inside #toolbar', /id="toolbar"[\s\S]*?id="btn-clear"/.test(html));

// CSS: background color red #e53935
assert('#btn-clear has background #e53935', /#btn-clear\s*\{[^}]*background\s*:\s*#e53935/.test(html));

// CSS: white text via #toolbar button rule
assert('#toolbar button has color: #fff (white text for all toolbar buttons)', /#toolbar\s+button\s*\{[^}]*color\s*:\s*#fff/.test(html));

// JS: click listener fills canvas with white
assert('btn-clear click listener calls ctx.fillStyle = #fff',
  /btn-clear[\s\S]{0,400}ctx\.fillStyle\s*=\s*['"]#fff['"]/.test(html));

assert('btn-clear click listener calls ctx.fillRect covering full canvas',
  /btn-clear[\s\S]{0,400}ctx\.fillRect\s*\(\s*0\s*,\s*0\s*,\s*canvas\.width\s*,\s*canvas\.height\s*\)/.test(html));

// JS: click listener resets snapshot (undo history cleared after clear)
assert('btn-clear click listener sets snapshot = null',
  /btn-clear[\s\S]{0,400}snapshot\s*=\s*null/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
