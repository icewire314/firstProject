// test-prompts.js — verifies the PROMPTS array and getRandomPrompt in index.html
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

console.log('PROMPTS array tests\n');

// PROMPTS array structure
assert('PROMPTS is declared as a const array', /const PROMPTS\s*=\s*\[/.test(html));
assert('PROMPTS array is closed with ]', /const PROMPTS\s*=\s*\[[\s\S]*?\]/.test(html));

// Extract the array literal to count and inspect items
const arrayMatch = html.match(/const PROMPTS\s*=\s*\[([\s\S]*?)\]/);
assert('PROMPTS array literal is extractable', !!arrayMatch);

if (arrayMatch) {
  const items = arrayMatch[1].match(/['"][^'"]+['"]/g) || [];

  assert('PROMPTS has at least 20 items', items.length >= 20);
  assert('PROMPTS has no more than 30 items (reasonable upper bound)', items.length <= 30);

  const stripped = items.map(s => s.replace(/^['"]|['"]$/g, ''));

  assert('All PROMPTS items are non-empty strings', stripped.every(s => s.length > 0));
  assert('All PROMPTS items are unique (no duplicates)', new Set(stripped).size === stripped.length);

  // Spot-check expected prompts from the task description
  assert('PROMPTS contains "a cat"', stripped.includes('a cat'));
  assert('PROMPTS contains "a house"', stripped.includes('a house'));
  assert('PROMPTS contains "a tree"', stripped.includes('a tree'));
}

// getRandomPrompt function
assert('getRandomPrompt function is defined', /function getRandomPrompt\s*\(\)/.test(html));
assert('getRandomPrompt uses Math.random()', /function getRandomPrompt[\s\S]{0,200}Math\.random\s*\(\s*\)/.test(html));
assert('getRandomPrompt indexes into PROMPTS', /function getRandomPrompt[\s\S]{0,200}PROMPTS\[/.test(html));
assert('getRandomPrompt uses Math.floor for integer index', /function getRandomPrompt[\s\S]{0,200}Math\.floor/.test(html));
assert('getRandomPrompt scales by PROMPTS.length', /function getRandomPrompt[\s\S]{0,200}PROMPTS\.length/.test(html));

// Prompt display
assert('Prompt is displayed on page load via getElementById("prompt")', /getElementById\s*\(\s*['"]prompt['"]\s*\)/.test(html));
assert('Prompt text includes "Draw: " prefix', /['"]Draw:\s*['"]/.test(html));
assert('getRandomPrompt() is called to set the prompt', /getElementById\s*\(\s*['"]prompt['"]\s*\)[\s\S]{0,100}getRandomPrompt\s*\(\s*\)/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
