// test-snapshot.js — verifies getImageData snapshot is saved on mousedown / touchstart
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

console.log('getImageData snapshot on mousedown / touchstart tests\n');

// snapshot variable is declared and initialised to null
assert('snapshot variable declared',
  /let snapshot\s*=/.test(html));

assert('snapshot initialised to null',
  /let snapshot\s*=\s*null/.test(html));

// startStroke saves the snapshot by calling ctx.getImageData
assert('startStroke calls ctx.getImageData',
  /function startStroke[\s\S]{0,400}ctx\.getImageData\s*\(/.test(html));

// getImageData is called with the full canvas dimensions (0, 0, canvas.width, canvas.height)
assert('getImageData called with full canvas dimensions',
  /getImageData\s*\(\s*0\s*,\s*0\s*,\s*canvas\.width\s*,\s*canvas\.height\s*\)/.test(html));

// the result of getImageData is assigned to snapshot
assert('snapshot assigned result of getImageData',
  /snapshot\s*=\s*ctx\.getImageData\s*\(/.test(html));

// mousedown event leads to startStroke (which saves the snapshot)
assert('mousedown triggers startStroke (captures snapshot on mouse press)',
  /canvas\.addEventListener\s*\(\s*['"]mousedown['"][\s\S]{0,200}startStroke\s*\(/.test(html));

// touchstart event leads to startStroke (which saves the snapshot)
assert('touchstart triggers startStroke (captures snapshot on touch press)',
  /canvas\.addEventListener\s*\(\s*['"]touchstart['"][\s\S]{0,200}startStroke\s*\(/.test(html));

// undo handler restores snapshot via putImageData
assert('undo handler restores snapshot with ctx.putImageData',
  /ctx\.putImageData\s*\(\s*snapshot\s*,\s*0\s*,\s*0\s*\)/.test(html));

// undo handler resets snapshot to null after restoring (single-level undo)
assert('undo handler resets snapshot to null after restore',
  /putImageData[\s\S]{0,100}snapshot\s*=\s*null/.test(html));

// clear button resets snapshot to null
assert('clear button resets snapshot to null',
  /btn-clear[\s\S]{0,200}snapshot\s*=\s*null/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
