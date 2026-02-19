// test-coords.js — verifies mouse and touch coordinate scaling
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

console.log('coordinate scaling tests\n');

// getCoords function is defined
assert('getCoords function is defined',
  /function getCoords\s*\(/.test(html));

// getCoords uses getBoundingClientRect
assert('getCoords calls getBoundingClientRect',
  /function getCoords[\s\S]{0,300}getBoundingClientRect/.test(html));

// getCoords subtracts rect.left from clientX
assert('getCoords subtracts rect.left from e.clientX',
  /function getCoords[\s\S]{0,300}clientX\s*-\s*rect\.left/.test(html));

// getCoords subtracts rect.top from clientY
assert('getCoords subtracts rect.top from e.clientY',
  /function getCoords[\s\S]{0,300}clientY\s*-\s*rect\.top/.test(html));

// getCoords scales x by canvas.width / rect.width
assert('getCoords scales x by canvas.width / rect.width',
  /function getCoords[\s\S]{0,400}canvas\.width\s*\/\s*rect\.width/.test(html));

// getCoords scales y by canvas.height / rect.height
assert('getCoords scales y by canvas.height / rect.height',
  /function getCoords[\s\S]{0,400}canvas\.height\s*\/\s*rect\.height/.test(html));

// getCoords returns an object with x and y
assert('getCoords returns object with x and y properties',
  /function getCoords[\s\S]{0,400}return\s*\{[\s\S]{0,200}x\s*:[\s\S]{0,200}y\s*:/.test(html));

// getTouchCoords function is defined
assert('getTouchCoords function is defined',
  /function getTouchCoords\s*\(/.test(html));

// getTouchCoords uses getBoundingClientRect
assert('getTouchCoords calls getBoundingClientRect',
  /function getTouchCoords[\s\S]{0,300}getBoundingClientRect/.test(html));

// getTouchCoords reads from e.touches[0]
assert('getTouchCoords reads from e.touches[0]',
  /function getTouchCoords[\s\S]{0,300}e\.touches\s*\[\s*0\s*\]/.test(html));

// getTouchCoords subtracts rect.left from touch clientX
assert('getTouchCoords subtracts rect.left from touch clientX',
  /function getTouchCoords[\s\S]{0,400}clientX\s*-\s*rect\.left/.test(html));

// getTouchCoords subtracts rect.top from touch clientY
assert('getTouchCoords subtracts rect.top from touch clientY',
  /function getTouchCoords[\s\S]{0,400}clientY\s*-\s*rect\.top/.test(html));

// getTouchCoords scales x by canvas.width / rect.width
assert('getTouchCoords scales x by canvas.width / rect.width',
  /function getTouchCoords[\s\S]{0,500}canvas\.width\s*\/\s*rect\.width/.test(html));

// getTouchCoords scales y by canvas.height / rect.height
assert('getTouchCoords scales y by canvas.height / rect.height',
  /function getTouchCoords[\s\S]{0,500}canvas\.height\s*\/\s*rect\.height/.test(html));

// mousedown handler calls getCoords and passes result to startStroke
assert('mousedown handler uses getCoords for scaled coordinates',
  /mousedown[\s\S]{0,150}getCoords/.test(html));

// mousemove handler calls getCoords and passes result to continueStroke
assert('mousemove handler uses getCoords for scaled coordinates',
  /mousemove[\s\S]{0,150}getCoords/.test(html));

// touchstart handler calls getTouchCoords
assert('touchstart handler uses getTouchCoords for scaled coordinates',
  /touchstart[\s\S]{0,150}getTouchCoords/.test(html));

// touchmove handler calls getTouchCoords
assert('touchmove handler uses getTouchCoords for scaled coordinates',
  /touchmove[\s\S]{0,150}getTouchCoords/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
