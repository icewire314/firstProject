// test-line-style.js — verifies lineCap and lineJoin are set to 'round' in startStroke
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

console.log('lineCap and lineJoin tests\n');

// lineCap is set to 'round'
assert("ctx.lineCap is set to 'round'",
  /ctx\.lineCap\s*=\s*['"]round['"]/.test(html));

// lineJoin is set to 'round'
assert("ctx.lineJoin is set to 'round'",
  /ctx\.lineJoin\s*=\s*['"]round['"]/.test(html));

// Both are set inside startStroke so they apply at the start of every stroke
assert("lineCap and lineJoin are set inside startStroke",
  /function startStroke[\s\S]{0,400}ctx\.lineCap\s*=\s*['"]round['"]/.test(html) &&
  /function startStroke[\s\S]{0,400}ctx\.lineJoin\s*=\s*['"]round['"]/.test(html));

// lineCap is set before the first stroke call (within startStroke's scope)
assert("lineCap is configured before drawing begins (in startStroke, not continueStroke or endStroke)",
  (() => {
    const startIdx = html.indexOf('function startStroke');
    const continueIdx = html.indexOf('function continueStroke');
    const linecapIdx = html.indexOf("ctx.lineCap = 'round'");
    return linecapIdx > startIdx && linecapIdx < continueIdx;
  })());

// lineJoin is set before the first stroke call (within startStroke's scope)
assert("lineJoin is configured before drawing begins (in startStroke, not continueStroke or endStroke)",
  (() => {
    const startIdx = html.indexOf('function startStroke');
    const continueIdx = html.indexOf('function continueStroke');
    const linejoinIdx = html.indexOf("ctx.lineJoin = 'round'");
    return linejoinIdx > startIdx && linejoinIdx < continueIdx;
  })());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
