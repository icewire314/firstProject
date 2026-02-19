// test-purple-button.js — verifies the Purple toolbar button in index.html
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

console.log('Purple button tests\n');

// HTML: button element
assert('#btn-purple button element exists in toolbar', /<button[^>]+id="btn-purple"/.test(html));
assert('#btn-purple has label text "Purple"', /<button[^>]+id="btn-purple"[^>]*>Purple<\/button>/.test(html));
assert('#btn-purple is inside #toolbar', /id="toolbar"[\s\S]*?id="btn-purple"/.test(html));

// CSS: background color
assert('#btn-purple has background #7b1fa2', /#btn-purple\s*\{[^}]*background\s*:\s*#7b1fa2/.test(html));

// CSS: white text via #toolbar button rule
assert('#toolbar button has color: #fff (white text for all toolbar buttons)', /#toolbar\s+button\s*\{[^}]*color\s*:\s*#fff/.test(html));

// JS: COLORS map includes purple → #7b1fa2
assert('COLORS object maps purple to #7b1fa2', /COLORS\s*=\s*\{[^}]*purple\s*:\s*['"]#7b1fa2['"]/.test(html));

// JS: click listener calls setActiveTool('purple')
assert("btn-purple click listener calls setActiveTool('purple')",
  /btn-purple[\s\S]{0,200}setActiveTool\s*\(\s*['"]purple['"]\s*\)/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
