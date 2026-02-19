// test-prompt-display.js — verifies prompt is displayed below the title in "Draw: [prompt]" format
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

console.log('Prompt display tests\n');

// Element structure
assert('#prompt element exists in HTML', /id="prompt"/.test(html));
assert('<h1> title element exists', /<h1[^>]*>/.test(html));

const h1Idx = html.indexOf('<h1');
const promptIdx = html.indexOf('id="prompt"');
assert('#prompt appears after <h1> in DOM (below the title)', promptIdx > h1Idx);

// Format: "Draw: [prompt]"
assert('Prompt is set via textContent (not innerHTML)', /getElementById\s*\(\s*['"]prompt['"]\s*\)\.textContent/.test(html));
assert('Prompt text starts with "Draw: " prefix', /\.textContent\s*=\s*['"]Draw:\s*['"]/.test(html));
assert('Prompt text appends a random prompt after "Draw: "', /\.textContent\s*=\s*['"]Draw:\s*['"]\s*\+\s*getRandomPrompt\s*\(\s*\)/.test(html));

// Styling
const promptCss = html.match(/#prompt\s*\{([^}]*)\}/);
assert('#prompt has a CSS rule block', !!promptCss);
if (promptCss) {
  assert('#prompt has font-size set', /font-size\s*:/.test(promptCss[1]));
  assert('#prompt has margin-bottom for spacing', /margin-bottom\s*:/.test(promptCss[1]));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
