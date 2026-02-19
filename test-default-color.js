// test-default-color.js — verifies Brown is the default active color on load
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

console.log('Default active color tests\n');

// activeTool variable initialised to 'brown'
assert("activeTool variable initialised to 'brown'",
  /let\s+activeTool\s*=\s*['"]brown['"]/.test(html));

// setActiveTool('brown') is called at page load (outside any event handler)
// It must appear after the event-listener block, not only inside a click callback
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';

// The last occurrence of setActiveTool('brown') is the top-level load call,
// which must come after the purple click-listener registration
const lastBrownIdx = script.lastIndexOf("setActiveTool('brown')");
const purpleListenerIdx = script.indexOf("btn-purple");
assert("setActiveTool('brown') called at top level after event listeners are registered",
  lastBrownIdx !== -1 && purpleListenerIdx !== -1 && lastBrownIdx > purpleListenerIdx);

// The top-level call should not be followed by a closing paren on the same line
// (it would be a standalone statement, not an argument to addEventListener)
const lineOfCall = script.slice(lastBrownIdx).match(/^[^\n]*/)[0];
assert("Top-level setActiveTool('brown') is a standalone statement, not inside a callback",
  !/addEventListener/.test(lineOfCall));

// activeTool default value matches COLORS brown key
assert('COLORS.brown and activeTool default both use the key "brown"',
  /COLORS\s*=\s*\{[^}]*brown\s*:/.test(html) && /activeTool\s*=\s*['"]brown['"]/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
