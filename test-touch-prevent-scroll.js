// test-touch-prevent-scroll.js — verifies e.preventDefault() is called on all touch events
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

console.log('Touch preventDefault (scroll blocking) tests\n');

// touchstart
assert('touchstart calls e.preventDefault()',
  /canvas\.addEventListener\s*\(\s*['"]touchstart['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));
assert('touchstart registered with { passive: false } to allow preventDefault',
  /['"]touchstart['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

// touchmove
assert('touchmove calls e.preventDefault()',
  /canvas\.addEventListener\s*\(\s*['"]touchmove['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));
assert('touchmove registered with { passive: false } to allow preventDefault',
  /['"]touchmove['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

// touchend
assert('touchend calls e.preventDefault()',
  /canvas\.addEventListener\s*\(\s*['"]touchend['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));
assert('touchend registered with { passive: false } to allow preventDefault',
  /['"]touchend['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
