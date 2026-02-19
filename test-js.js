// test-js.js — verifies the <script> block in index.html
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

console.log('JavaScript script block tests\n');

// Structure
assert('<script> block exists in <body>', /<body[\s\S]*?<script[\s\S]*?<\/script>[\s\S]*?<\/body>/.test(html));

// HTML elements the script depends on
assert('<canvas> has id="canvas" width=800 height=500', /<canvas[^>]+id="canvas"[^>]+width="800"[^>]+height="500"/.test(html));
assert('<div id="prompt"> exists', /<div[^>]+id="prompt"/.test(html));
assert('<h1> exists', /<h1>/.test(html));
assert('<div id="toolbar"> exists', /<div[^>]+id="toolbar"/.test(html));
assert('#btn-brown button exists', /<button[^>]+id="btn-brown"/.test(html));
assert('#btn-purple button exists', /<button[^>]+id="btn-purple"/.test(html));
assert('#btn-eraser button exists', /<button[^>]+id="btn-eraser"/.test(html));
assert('#btn-clear button exists', /<button[^>]+id="btn-clear"/.test(html));

// Prompts array
assert('PROMPTS array is defined', /const PROMPTS\s*=\s*\[/.test(html));
assert('PROMPTS contains "a cat"', /['"]a cat['"]/.test(html));
assert('PROMPTS contains "a butterfly"', /['"]a butterfly['"]/.test(html));
assert('getRandomPrompt function is defined', /function getRandomPrompt\s*\(\)/.test(html));

// Canvas setup
assert('canvas context obtained with getContext', /getContext\s*\(\s*['"]2d['"]\s*\)/.test(html));
assert('canvas initialized with white fill', /fillStyle\s*=\s*['"]#fff['"]/.test(html));
assert('fillRect called for white background', /fillRect\s*\(/.test(html));

// Drawing engine
assert('mousedown listener added to canvas', /canvas\.addEventListener\s*\(\s*['"]mousedown['"]/.test(html));
assert('mousemove listener added to canvas', /canvas\.addEventListener\s*\(\s*['"]mousemove['"]/.test(html));
assert('mouseup listener added to canvas', /canvas\.addEventListener\s*\(\s*['"]mouseup['"]/.test(html));
assert('mouseleave listener added to canvas', /canvas\.addEventListener\s*\(\s*['"]mouseleave['"]/.test(html));

// Smooth bezier curves
assert('quadraticCurveTo used for smooth strokes', /quadraticCurveTo\s*\(/.test(html));
assert('lineCap set to round', /lineCap\s*=\s*['"]round['"]/.test(html));
assert('lineJoin set to round', /lineJoin\s*=\s*['"]round['"]/.test(html));
assert('lineWidth set to 8', /lineWidth\s*=\s*8/.test(html));

// Coordinate scaling
assert('coordinate scaling uses canvas.width / rect.width', /canvas\.width\s*\/\s*rect\.width/.test(html));
assert('coordinate scaling uses canvas.height / rect.height', /canvas\.height\s*\/\s*rect\.height/.test(html));

// Touch support
assert('touchstart listener with passive:false', /['"]touchstart['"][\s\S]{0,200}passive\s*:\s*false/.test(html));
assert('touchmove listener with passive:false', /['"]touchmove['"][\s\S]{0,200}passive\s*:\s*false/.test(html));
assert('touchend listener added', /canvas\.addEventListener\s*\(\s*['"]touchend['"]/.test(html));
assert('e.preventDefault() called in touch handlers', /e\.preventDefault\s*\(\s*\)/.test(html));
assert('e.touches[0] used for touch coords', /e\.touches\[0\]/.test(html));

// Colors
assert('brown color #795548 defined', /#795548/.test(html));
assert('purple color #7b1fa2 defined', /#7b1fa2/.test(html));
assert('eraser uses white (#fff)', /eraser\s*:\s*['"]#fff['"]/.test(html));

// Undo
assert('getImageData saves snapshot on stroke start', /getImageData\s*\(/.test(html));
assert('putImageData restores snapshot on undo', /putImageData\s*\(/.test(html));
assert('keydown listener for undo', /['"]keydown['"]/.test(html));
assert('Ctrl+Z / Cmd+Z detected', /ctrlKey[\s\S]{0,50}metaKey/.test(html) || /metaKey[\s\S]{0,50}ctrlKey/.test(html));
assert('e.key === "z" checked for undo', /e\.key\s*===\s*['"]z['"]/.test(html));

// Clear
assert('clear button fills canvas with white', /btn-clear[\s\S]{0,300}fillRect/.test(html));
assert('clear resets snapshot to null', /snapshot\s*=\s*null/.test(html));

// Active tool
assert('setActiveTool function defined', /function setActiveTool\s*\(/.test(html));
assert('active class toggled on tool buttons', /classList\.remove\s*\(\s*['"]active['"]/.test(html));
assert('active class added to selected tool', /classList\.add\s*\(\s*['"]active['"]/.test(html));
assert('brown is the default active tool', /setActiveTool\s*\(\s*['"]brown['"]/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
