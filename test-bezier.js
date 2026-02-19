// test-bezier.js — verifies smooth bezier curve rendering via quadraticCurveTo with midpoints
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

console.log('bezier curve rendering tests\n');

// continueStroke uses quadraticCurveTo
assert('continueStroke calls ctx.quadraticCurveTo',
  /function continueStroke[\s\S]{0,400}ctx\.quadraticCurveTo\s*\(/.test(html));

// Control point is the previous position (lastX, lastY)
assert('quadraticCurveTo uses lastX and lastY as control point',
  /ctx\.quadraticCurveTo\s*\(\s*lastX\s*,\s*lastY\s*,/.test(html));

// End point is the midpoint between previous and current positions
assert('midX is calculated as average of lastX and x',
  /const midX\s*=\s*\(\s*lastX\s*\+\s*x\s*\)\s*\/\s*2/.test(html));
assert('midY is calculated as average of lastY and y',
  /const midY\s*=\s*\(\s*lastY\s*\+\s*y\s*\)\s*\/\s*2/.test(html));

// quadraticCurveTo ends at the midpoint
assert('quadraticCurveTo endpoint is midX, midY',
  /ctx\.quadraticCurveTo\s*\(\s*lastX\s*,\s*lastY\s*,\s*midX\s*,\s*midY\s*\)/.test(html));

// ctx.stroke() is called after the curve segment
assert('ctx.stroke is called after quadraticCurveTo',
  /ctx\.quadraticCurveTo[\s\S]{0,60}ctx\.stroke\s*\(\s*\)/.test(html));

// Next segment starts from the midpoint (ctx.beginPath + ctx.moveTo(midX, midY))
assert('ctx.beginPath is called to start next segment',
  /function continueStroke[\s\S]{0,500}ctx\.beginPath\s*\(\s*\)/.test(html));
assert('ctx.moveTo is called with midX, midY to continue from midpoint',
  /ctx\.moveTo\s*\(\s*midX\s*,\s*midY\s*\)/.test(html));

// lastX and lastY are updated after each segment
assert('lastX is updated to x after each segment',
  /function continueStroke[\s\S]{0,500}lastX\s*=\s*x/.test(html));
assert('lastY is updated to y after each segment',
  /function continueStroke[\s\S]{0,500}lastY\s*=\s*y/.test(html));

// Stroke style: round caps and joins, 8px brush
assert('lineCap is set to round for smooth strokes',
  /ctx\.lineCap\s*=\s*['"]round['"]/.test(html));
assert('lineJoin is set to round for smooth strokes',
  /ctx\.lineJoin\s*=\s*['"]round['"]/.test(html));
assert('lineWidth is set to 8',
  /ctx\.lineWidth\s*=\s*8/.test(html));

// endStroke finalizes with lineTo to connect the last gap
assert('endStroke calls ctx.lineTo to complete the final segment',
  /function endStroke[\s\S]{0,200}ctx\.lineTo\s*\(/.test(html));
assert('endStroke calls ctx.stroke to render the final segment',
  /function endStroke[\s\S]{0,200}ctx\.stroke\s*\(\s*\)/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
