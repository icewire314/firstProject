// test-active-indicator-switch.js — verifies active indicator updates when user switches tools
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

console.log('Active indicator switch tests\n');

const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';

// setActiveTool clears ALL buttons before activating new one (ensures previous indicator is removed)
assert('setActiveTool clears active from all toolbar buttons before setting new one',
  /querySelectorAll\s*\(\s*['"]#toolbar button['"]\s*\)[\s\S]{0,50}forEach[\s\S]{0,100}classList\.remove\s*\(\s*['"]active['"]\s*\)/.test(script));

// setActiveTool targets the correct button by ID using the tool name
assert("setActiveTool uses 'btn-' + tool to target the correct button",
  /getElementById\s*\(\s*['"]btn-['"][\s\S]{0,10}\+\s*tool\s*\)/.test(script));

// Each tool button click calls setActiveTool to update the indicator
assert("clicking brown button triggers setActiveTool('brown')",
  /btn-brown[\s\S]{0,100}setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(html));

assert("clicking purple button triggers setActiveTool('purple')",
  /btn-purple[\s\S]{0,100}setActiveTool\s*\(\s*['"]purple['"]\s*\)/.test(html));

assert("clicking eraser button triggers setActiveTool('eraser')",
  /btn-eraser[\s\S]{0,100}setActiveTool\s*\(\s*['"]eraser['"]\s*\)/.test(html));

// Clear button does not call setActiveTool (it is not a selectable tool)
assert('clear button does not call setActiveTool (no active state)',
  !/btn-clear[\s\S]{0,100}setActiveTool/.test(html));

// CSS: active class applies a visible white outline to indicate the selected tool
const activeRule = html.match(/#toolbar\s+button\.active\s*\{([^}]*)\}/);
assert('CSS .active class applies white outline as the visual indicator',
  !!activeRule && /outline\s*:[^;]*#fff/.test(activeRule[1]));

// Brown is the default active tool on page load
assert("setActiveTool('brown') called on page load to set initial indicator",
  /setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(script));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
