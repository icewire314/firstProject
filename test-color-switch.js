// test-color-switch.js — verifies switching active drawing color on button click
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

console.log('Color switch tests\n');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';

// setActiveTool function exists
assert('setActiveTool function is defined',
  /function\s+setActiveTool\s*\(/.test(script));

// setActiveTool updates activeTool variable
assert('setActiveTool assigns its argument to activeTool',
  /function\s+setActiveTool\s*\(\s*tool\s*\)[\s\S]{0,300}activeTool\s*=\s*tool/.test(script));

// setActiveTool removes .active from all toolbar buttons
assert('setActiveTool removes active class from all toolbar buttons',
  /querySelectorAll\s*\(\s*['"]#toolbar button['"]\s*\)[\s\S]{0,100}classList\.remove\s*\(\s*['"]active['"]\s*\)/.test(script));

// setActiveTool adds .active to the selected button
assert("setActiveTool adds active class to the target button via 'btn-' + tool",
  /getElementById\s*\(\s*['"]btn-['"].*\+\s*tool\s*\)[\s\S]{0,50}classList\.add\s*\(\s*['"]active['"]\s*\)/.test(script));

// startStroke uses COLORS[activeTool] as stroke style
assert('startStroke sets strokeStyle from COLORS[activeTool]',
  /strokeStyle\s*=\s*COLORS\s*\[\s*activeTool\s*\]/.test(script));

// Brown button click switches to brown
assert("clicking btn-brown calls setActiveTool with 'brown'",
  /btn-brown[\s\S]{0,200}setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(html));

// Purple button click switches to purple
assert("clicking btn-purple calls setActiveTool with 'purple'",
  /btn-purple[\s\S]{0,200}setActiveTool\s*\(\s*['"]purple['"]\s*\)/.test(html));

// Eraser button click switches to eraser
assert("clicking btn-eraser calls setActiveTool with 'eraser'",
  /btn-eraser[\s\S]{0,200}setActiveTool\s*\(\s*['"]eraser['"]\s*\)/.test(html));

// COLORS map has all three tools
assert("COLORS map defines entries for brown, purple, and eraser",
  /COLORS\s*=\s*\{[^}]*brown[^}]*purple[^}]*eraser/.test(script));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
