// test-eraser-button.js — verifies the Eraser toolbar button in index.html
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

console.log('Eraser button tests\n');

// HTML: button element
assert('#btn-eraser button element exists in toolbar', /<button[^>]+id="btn-eraser"/.test(html));
assert('#btn-eraser has label text "Eraser"', /<button[^>]+id="btn-eraser"[^>]*>Eraser<\/button>/.test(html));
assert('#btn-eraser is inside #toolbar', /id="toolbar"[\s\S]*?id="btn-eraser"/.test(html));

// CSS: background color grey #9e9e9e
assert('#btn-eraser has background #9e9e9e', /#btn-eraser\s*\{[^}]*background\s*:\s*#9e9e9e/.test(html));

// CSS: white text via #toolbar button rule
assert('#toolbar button has color: #fff (white text for all toolbar buttons)', /#toolbar\s+button\s*\{[^}]*color\s*:\s*#fff/.test(html));

// JS: COLORS map includes eraser → #fff (white, paints over canvas)
assert('COLORS object maps eraser to #fff', /COLORS\s*=\s*\{[^}]*eraser\s*:\s*['"]#fff['"]/.test(html));

// JS: click listener calls setActiveTool('eraser')
assert("btn-eraser click listener calls setActiveTool('eraser')",
  /btn-eraser[\s\S]{0,200}setActiveTool\s*\(\s*['"]eraser['"]\s*\)/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
