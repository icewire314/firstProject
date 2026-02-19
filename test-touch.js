// test-touch.js — verifies touchstart handler is mapped to stroke begin
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

console.log('Touch start handler tests\n');

// getTouchCoords helper exists and uses e.touches[0]
assert('getTouchCoords function is defined', /function getTouchCoords\s*\(/.test(html));
assert('getTouchCoords uses e.touches[0]', /function getTouchCoords[\s\S]{0,200}e\.touches\[0\]/.test(html));
assert('getTouchCoords scales x with canvas.width / rect.width',
  /function getTouchCoords[\s\S]{0,300}canvas\.width\s*\/\s*rect\.width/.test(html));
assert('getTouchCoords scales y with canvas.height / rect.height',
  /function getTouchCoords[\s\S]{0,300}canvas\.height\s*\/\s*rect\.height/.test(html));

// touchstart listener registration
assert('touchstart listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]touchstart['"]/.test(html));
assert('touchstart registered with { passive: false }',
  /['"]touchstart['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

// touchstart calls e.preventDefault()
assert('touchstart handler calls e.preventDefault()',
  /['"]touchstart['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));

// touchstart maps to startStroke via getTouchCoords
assert('touchstart handler calls getTouchCoords(e)',
  /['"]touchstart['"][\s\S]{0,150}getTouchCoords\s*\(\s*e\s*\)/.test(html));
assert('touchstart handler calls startStroke',
  /['"]touchstart['"][\s\S]{0,200}startStroke\s*\(/.test(html));

// startStroke sets isDrawing = true
assert('startStroke sets isDrawing = true', /function startStroke[\s\S]{0,200}isDrawing\s*=\s*true/.test(html));

// startStroke saves canvas snapshot (for undo)
assert('startStroke saves snapshot via getImageData',
  /function startStroke[\s\S]{0,200}getImageData\s*\(/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
