// test-touchmove.js — verifies touchmove handler is mapped to stroke continue
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

console.log('Touch move handler tests\n');

// touchmove listener registration
assert('touchmove listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]touchmove['"]/.test(html));
assert('touchmove registered with { passive: false }',
  /['"]touchmove['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

// touchmove calls e.preventDefault()
assert('touchmove handler calls e.preventDefault()',
  /['"]touchmove['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));

// touchmove maps to continueStroke via getTouchCoords
assert('touchmove handler calls getTouchCoords(e)',
  /['"]touchmove['"][\s\S]{0,150}getTouchCoords\s*\(\s*e\s*\)/.test(html));
assert('touchmove handler calls continueStroke',
  /['"]touchmove['"][\s\S]{0,200}continueStroke\s*\(/.test(html));

// continueStroke guards with isDrawing check
assert('continueStroke returns early when not drawing',
  /function continueStroke[\s\S]{0,200}if\s*\(\s*!isDrawing\s*\)/.test(html));

// continueStroke accumulates points
assert('continueStroke pushes { x, y } to points array',
  /function continueStroke[\s\S]{0,300}points\.push\s*\(/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
