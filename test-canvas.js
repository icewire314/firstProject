// test-canvas.js — verifies the <canvas> element and its internal resolution
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

console.log('Canvas element tests\n');

// Element presence
assert('<canvas> element exists', /<canvas/.test(html));
assert('<canvas> has id="canvas"', /<canvas[^>]+id="canvas"/.test(html));

// Internal resolution (HTML attributes, not CSS)
assert('<canvas> has width="800" (internal resolution)', /<canvas[^>]+width="800"/.test(html));
assert('<canvas> has height="500" (internal resolution)', /<canvas[^>]+height="500"/.test(html));

// Both dimensions on same element
assert('<canvas> has width=800 and height=500 on same element',
  /<canvas[^>]+width="800"[^>]+height="500"/.test(html) ||
  /<canvas[^>]+height="500"[^>]+width="800"/.test(html));

// Canvas is inside the canvas-container (regex match the block content)
assert('<canvas> is inside #canvas-container',
  /id="canvas-container"[\s\S]*?<canvas/.test(html));

// CSS: canvas scales to fill container width
assert('canvas CSS has width: 100% (CSS-scaled to fit window width)',
  /canvas\s*\{[^}]*width\s*:\s*100%/.test(html));

// CSS: canvas preserves aspect ratio
assert('canvas CSS has height: auto (preserves aspect ratio)',
  /canvas\s*\{[^}]*height\s*:\s*auto/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
