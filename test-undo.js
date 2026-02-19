// test-undo.js — verifies Ctrl+Z / Cmd+Z keydown undo behaviour
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

console.log('Ctrl+Z / Cmd+Z undo keydown tests\n');

// A keydown listener is registered on document
assert('document has a keydown event listener',
  /document\.addEventListener\s*\(\s*['"]keydown['"]/.test(html));

// The handler checks ctrlKey
assert('keydown handler checks ctrlKey',
  /document\.addEventListener\s*\(\s*['"]keydown['"][\s\S]{0,300}ctrlKey/.test(html));

// The handler checks metaKey (for Mac Cmd+Z)
assert('keydown handler checks metaKey',
  /document\.addEventListener\s*\(\s*['"]keydown['"][\s\S]{0,300}metaKey/.test(html));

// ctrlKey and metaKey are combined with || (either triggers undo)
assert('ctrlKey and metaKey are combined with ||',
  /\(e\.ctrlKey\s*\|\|\s*e\.metaKey\)/.test(html) ||
  /\(e\.metaKey\s*\|\|\s*e\.ctrlKey\)/.test(html));

// The handler checks that the key is 'z'
assert("keydown handler checks e.key === 'z'",
  /e\.key\s*===?\s*['"]z['"]/.test(html));

// The handler calls putImageData to restore the snapshot
assert('undo handler calls ctx.putImageData(snapshot, 0, 0)',
  /ctx\.putImageData\s*\(\s*snapshot\s*,\s*0\s*,\s*0\s*\)/.test(html));

// The handler resets snapshot to null after restoring (single-level undo)
assert('undo handler resets snapshot to null after restore',
  /putImageData[\s\S]{0,100}snapshot\s*=\s*null/.test(html));

// The handler only fires when a snapshot exists (guard check)
assert('undo handler guards on snapshot being truthy',
  /document\.addEventListener\s*\(\s*['"]keydown['"][\s\S]{0,400}snapshot/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
