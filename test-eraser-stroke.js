// test-eraser-stroke.js — verifies eraser is implemented as white-paint stroke
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

console.log('Eraser stroke tests\n');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';

// Eraser color is white (#fff), confirming white-paint approach
assert("COLORS maps eraser to '#fff' (white paint)",
  /COLORS\s*=\s*\{[^}]*eraser\s*:\s*['"]#fff['"]/.test(script));

// Eraser does NOT use destination-out compositing (it's white paint, not transparency)
assert('eraser does not use destination-out compositing',
  !/destination-out/.test(script));

// Eraser shares startStroke — which sets lineWidth to 8 (same as drawing tools)
assert('startStroke sets lineWidth to 8 (applies to eraser and drawing tools equally)',
  /function startStroke[\s\S]{0,400}ctx\.lineWidth\s*=\s*8\b/.test(script));

// Eraser shares startStroke — which sets lineCap to round (same as drawing tools)
assert("startStroke sets lineCap to 'round' (applies to eraser and drawing tools equally)",
  /function startStroke[\s\S]{0,400}ctx\.lineCap\s*=\s*['"]round['"]/.test(script));

// Eraser shares startStroke — which sets lineJoin to round (same as drawing tools)
assert("startStroke sets lineJoin to 'round' (applies to eraser and drawing tools equally)",
  /function startStroke[\s\S]{0,400}ctx\.lineJoin\s*=\s*['"]round['"]/.test(script));

// strokeStyle is set from COLORS[activeTool], so eraser gets white automatically
assert('startStroke sets strokeStyle from COLORS[activeTool] (picks up eraser white)',
  /strokeStyle\s*=\s*COLORS\s*\[\s*activeTool\s*\]/.test(script));

// No separate eraser drawing path — eraser reuses the same stroke functions
assert('eraser reuses startStroke/continueStroke/endStroke (no separate eraser drawing code)',
  (() => {
    // Confirm there is no special-cased eraser branch in startStroke
    const startStrokeMatch = script.match(/function startStroke[\s\S]*?function /);
    const startStrokeBody = startStrokeMatch ? startStrokeMatch[0] : '';
    return !/activeTool\s*===?\s*['"]eraser['"]/.test(startStrokeBody) &&
           !/activeTool\s*===?\s*['"]eraser['"]/.test(script.match(/function continueStroke[\s\S]*?function /)?.[0] || '');
  })());

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
