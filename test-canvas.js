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

// Canvas initialization: background filled white
assert('canvas background is filled white on init (fillStyle set to #fff)',
  /ctx\.fillStyle\s*=\s*['"]#fff['"]/.test(html));
assert('canvas background is filled white on init (fillRect called with full canvas size)',
  /ctx\.fillRect\s*\(\s*0\s*,\s*0\s*,\s*canvas\.width\s*,\s*canvas\.height\s*\)/.test(html));

// Confirm init fill happens before any drawing event listeners
assert('canvas white fill occurs before drawing event listeners are attached', (() => {
  const fillIdx = html.indexOf("ctx.fillRect(0, 0, canvas.width, canvas.height)");
  const mousedownIdx = html.indexOf("mousedown");
  return fillIdx !== -1 && mousedownIdx !== -1 && fillIdx < mousedownIdx;
})());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
