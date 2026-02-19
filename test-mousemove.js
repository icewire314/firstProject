// test-mousemove.js — verifies mousemove point accumulation while mouse button is held
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

console.log('mousemove point accumulation tests\n');

// points array is declared
assert('points array is declared',
  /let points\s*=\s*\[\s*\]/.test(html));

// mousemove listener is registered on the canvas
assert('mousemove listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]mousemove['"]/.test(html));

// mousemove handler calls continueStroke
assert('mousemove handler calls continueStroke',
  /mousemove[\s\S]{0,100}continueStroke\s*\(/.test(html));

// continueStroke function is defined
assert('continueStroke function is defined',
  /function continueStroke\s*\(/.test(html));

// continueStroke accepts x, y parameters
assert('continueStroke accepts x and y parameters',
  /function continueStroke\s*\(\s*x\s*,\s*y\s*\)/.test(html));

// continueStroke guards with isDrawing check
assert('continueStroke returns early when not drawing',
  /function continueStroke[\s\S]{0,200}if\s*\(\s*!isDrawing\s*\)/.test(html));

// continueStroke pushes a point to the points array
assert('continueStroke pushes { x, y } to points array',
  /function continueStroke[\s\S]{0,300}points\.push\s*\(/.test(html));

// startStroke resets points array with the start point
assert('startStroke resets points array with start point',
  /function startStroke[\s\S]{0,300}points\s*=\s*\[/.test(html));

// The point pushed by continueStroke includes x and y
assert('points.push call includes x and y coordinates',
  /points\.push\s*\(\s*\{\s*x\s*,\s*y\s*\}/.test(html));

// startStroke initial point includes x and y
assert('startStroke initialises points with { x, y } entry',
  /points\s*=\s*\[\s*\{\s*x\s*,\s*y\s*\}/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
