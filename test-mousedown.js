// test-mousedown.js — verifies mousedown stroke initiation and start position recording
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

console.log('mousedown stroke initiation tests\n');

// mousedown listener is registered on the canvas
assert('mousedown listener added to canvas',
  /canvas\.addEventListener\s*\(\s*['"]mousedown['"]/.test(html));

// startStroke function is defined
assert('startStroke function is defined',
  /function startStroke\s*\(/.test(html));

// startStroke accepts x, y parameters
assert('startStroke accepts x and y parameters',
  /function startStroke\s*\(\s*x\s*,\s*y\s*\)/.test(html));

// mousedown handler calls startStroke with canvas-scaled coordinates
assert('mousedown handler calls startStroke with scaled coordinates',
  /mousedown[\s\S]{0,100}startStroke\s*\(/.test(html));

// startStroke sets isDrawing to true
assert('startStroke sets isDrawing = true',
  /function startStroke[\s\S]{0,300}isDrawing\s*=\s*true/.test(html));

// startStroke records lastX from the x parameter
assert('startStroke records lastX from start position',
  /function startStroke[\s\S]{0,300}lastX\s*=\s*x/.test(html));

// startStroke records lastY from the y parameter
assert('startStroke records lastY from start position',
  /function startStroke[\s\S]{0,300}lastY\s*=\s*y/.test(html));

// startStroke saves a snapshot via getImageData (for undo support)
assert('startStroke saves canvas snapshot via getImageData',
  /function startStroke[\s\S]{0,300}getImageData\s*\(/.test(html));

// startStroke calls ctx.beginPath to start a new path
assert('startStroke calls ctx.beginPath',
  /function startStroke[\s\S]{0,300}ctx\.beginPath\s*\(\s*\)/.test(html));

// startStroke calls ctx.moveTo with the start coordinates
assert('startStroke calls ctx.moveTo with start coordinates',
  /function startStroke[\s\S]{0,300}ctx\.moveTo\s*\(\s*x\s*,\s*y\s*\)/.test(html));

// Coordinate scaling applied before startStroke is called from mousedown
assert('getCoords scales coordinates using canvas.width / rect.width',
  /canvas\.width\s*\/\s*rect\.width/.test(html));
assert('getCoords scales coordinates using canvas.height / rect.height',
  /canvas\.height\s*\/\s*rect\.height/.test(html));

// isDrawing starts as false (drawing only active during a stroke)
assert('isDrawing initialised to false',
  /let isDrawing\s*=\s*false/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
