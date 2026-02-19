// test-brush-size.js — verifies lineWidth is fixed at 8px in startStroke
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

console.log('Brush size tests\n');

// lineWidth is set to 8
assert('ctx.lineWidth is set to 8',
  /ctx\.lineWidth\s*=\s*8\b/.test(html));

// lineWidth is set inside startStroke
assert('ctx.lineWidth = 8 is set inside startStroke',
  /function startStroke[\s\S]{0,400}ctx\.lineWidth\s*=\s*8\b/.test(html));

// lineWidth is set before drawing begins (in startStroke, not continueStroke or endStroke)
assert('lineWidth is configured before drawing begins (in startStroke, not continueStroke or endStroke)',
  (() => {
    const startIdx = html.indexOf('function startStroke');
    const continueIdx = html.indexOf('function continueStroke');
    const lineWidthIdx = html.indexOf('ctx.lineWidth = 8');
    return lineWidthIdx > startIdx && lineWidthIdx < continueIdx;
  })());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
