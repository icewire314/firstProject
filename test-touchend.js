// test-touchend.js — verifies touchend handler is mapped to stroke end
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

console.log('Touch end handler tests\n');

// touchend listener registration
assert('touchend listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]touchend['"]/.test(html));
assert('touchend registered with { passive: false }',
  /['"]touchend['"][\s\S]{0,200}passive\s*:\s*false/.test(html));

// touchend calls e.preventDefault()
assert('touchend handler calls e.preventDefault()',
  /['"]touchend['"][\s\S]{0,100}e\.preventDefault\s*\(\s*\)/.test(html));

// touchend maps to endStroke
assert('touchend handler calls endStroke',
  /['"]touchend['"][\s\S]{0,100}endStroke\s*\(/.test(html));

// endStroke guards with isDrawing check
assert('endStroke returns early when not drawing',
  /function endStroke[\s\S]{0,200}if\s*\(\s*!isDrawing\s*\)/.test(html));

// endStroke sets isDrawing to false
assert('endStroke sets isDrawing = false',
  /function endStroke[\s\S]{0,300}isDrawing\s*=\s*false/.test(html));

// endStroke commits the final segment
assert('endStroke calls ctx.stroke',
  /function endStroke[\s\S]{0,300}ctx\.stroke\s*\(\s*\)/.test(html));

// endStroke is defined before the touchend listener
assert('endStroke is defined before touchend listener',
  (() => {
    const endStrokeDefIdx = html.indexOf('function endStroke');
    const touchendListenerIdx = html.search(/canvas\.addEventListener\s*\(\s*['"]touchend['"]/);
    return endStrokeDefIdx !== -1 && touchendListenerIdx !== -1 && endStrokeDefIdx < touchendListenerIdx;
  })());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
