// test-mouseup-mouseleave.js — verifies mouseup and mouseleave end a stroke
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

console.log('mouseup / mouseleave stroke-end tests\n');

// endStroke function is defined
assert('endStroke function is defined',
  /function endStroke\s*\(/.test(html));

// endStroke guards with isDrawing check
assert('endStroke returns early when not drawing',
  /function endStroke[\s\S]{0,200}if\s*\(\s*!isDrawing\s*\)/.test(html));

// endStroke sets isDrawing to false
assert('endStroke sets isDrawing = false',
  /function endStroke[\s\S]{0,300}isDrawing\s*=\s*false/.test(html));

// endStroke calls ctx.stroke to commit the final segment
assert('endStroke calls ctx.stroke',
  /function endStroke[\s\S]{0,300}ctx\.stroke\s*\(\s*\)/.test(html));

// mouseup listener is registered on the canvas
assert('mouseup listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]mouseup['"]/.test(html));

// mouseleave listener is registered on the canvas
assert('mouseleave listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]mouseleave['"]/.test(html));

// mouseup handler calls endStroke
assert('mouseup handler calls endStroke',
  /mouseup[\s\S]{0,100}endStroke/.test(html));

// mouseleave handler calls endStroke
assert('mouseleave handler calls endStroke',
  /mouseleave[\s\S]{0,100}endStroke/.test(html));

// endStroke is defined before the event listeners that use it
assert('endStroke is defined before event listeners',
  (() => {
    const endStrokeDefIdx = html.indexOf('function endStroke');
    const mouseupListenerIdx = html.search(/canvas\.addEventListener\s*\(\s*['"]mouseup['"]/);
    return endStrokeDefIdx !== -1 && mouseupListenerIdx !== -1 && endStrokeDefIdx < mouseupListenerIdx;
  })());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
