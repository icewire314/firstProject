// test-brown-button.js — verifies the Brown toolbar button in index.html
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

console.log('Brown button tests\n');

// HTML: button element
assert('#btn-brown button element exists in toolbar', /<button[^>]+id="btn-brown"/.test(html));
assert('#btn-brown has label text "Brown"', /<button[^>]+id="btn-brown"[^>]*>Brown<\/button>/.test(html));
assert('#btn-brown is inside #toolbar', /id="toolbar"[\s\S]*?id="btn-brown"/.test(html));

// CSS: background color
assert('#btn-brown has background #795548', /#btn-brown\s*\{[^}]*background\s*:\s*#795548/.test(html));

// CSS: white text via #toolbar button rule
assert('#toolbar button has color: #fff (white text for all toolbar buttons)', /#toolbar\s+button\s*\{[^}]*color\s*:\s*#fff/.test(html));

// JS: COLORS map includes brown → #795548
assert('COLORS object maps brown to #795548', /COLORS\s*=\s*\{[^}]*brown\s*:\s*['"]#795548['"]/.test(html));

// JS: click listener calls setActiveTool('brown')
assert("btn-brown click listener calls setActiveTool('brown')",
  /btn-brown[\s\S]{0,200}setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(html));

// JS: brown is set as the default active tool on page load
assert("setActiveTool('brown') called on page load as default",
  /setActiveTool\s*\(\s*['"]brown['"]\s*\)/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
