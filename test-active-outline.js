// test-active-outline.js — verifies the bright white outline on the active tool button
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

console.log('Active button outline tests\n');

// CSS: .active class exists on toolbar buttons
assert('#toolbar button.active CSS rule exists',
  /#toolbar\s+button\.active\s*\{/.test(html));

// CSS: white outline applied to active button
const activeRule = html.match(/#toolbar\s+button\.active\s*\{([^}]*)\}/);
assert('#toolbar button.active has outline with #fff (white)',
  !!activeRule && /outline\s*:[^;]*#fff/.test(activeRule[1]));

// CSS: outline is solid (not dashed/dotted)
assert('#toolbar button.active outline is solid',
  !!activeRule && /outline\s*:[^;]*solid/.test(activeRule[1]));

// JS: setActiveTool removes active class from all buttons before adding
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const script = scriptMatch ? scriptMatch[1] : '';

assert('setActiveTool removes active class from all toolbar buttons before adding',
  /querySelectorAll\s*\(\s*['"]#toolbar button['"]\s*\)[\s\S]{0,100}classList\.remove\s*\(\s*['"]active['"]\s*\)/.test(script));

// JS: setActiveTool adds active class to the clicked button
assert("setActiveTool adds active class to the target button",
  /getElementById\s*\(\s*['"]btn-['"].*\+\s*tool\s*\)[\s\S]{0,50}classList\.add\s*\(\s*['"]active['"]\s*\)/.test(script));

// JS: brown is active by default on page load
assert("setActiveTool('brown') is called on page load to set initial active button",
  /setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(script));

// HTML: buttons that can become active all exist
['btn-brown', 'btn-purple', 'btn-eraser'].forEach(id => {
  assert(`#${id} button exists (can receive active class)`,
    html.includes(`id="${id}"`));
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
