const fs = require('fs');

const file = 'index.html';
const html = fs.readFileSync(file, 'utf8');

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  PASS: ${description}`);
    passed++;
  } else {
    console.error(`  FAIL: ${description}`);
    failed++;
  }
}

console.log(`Testing ${file}...\n`);

assert('Has DOCTYPE html', /<!DOCTYPE html>/i.test(html));
assert('Has <html> element with lang attribute', /<html[^>]+lang=/i.test(html));
assert('Has <head> element', /<head>/i.test(html));
assert('Has charset meta tag', /<meta[^>]+charset/i.test(html));
assert('Has viewport meta tag', /<meta[^>]+viewport/i.test(html));
assert('Has <title> with "Drawing Prompt"', /<title>Drawing Prompt<\/title>/i.test(html));
assert('Has <h1> with text "Drawing Prompt"', /<h1[^>]*>Drawing Prompt<\/h1>/i.test(html));
assert('Has closing </head>', /<\/head>/i.test(html));
assert('Has <body> element', /<body>/i.test(html));
assert('Has closing </body>', /<\/body>/i.test(html));
assert('Has closing </html>', /<\/html>/i.test(html));

// Toolbar styling tests
console.log('\nToolbar styling tests:\n');

assert('Has canvas-container wrapper', /id="canvas-container"/.test(html));

const containerIdx = html.indexOf('id="canvas-container"');
const toolbarIdx = html.indexOf('id="toolbar"');
const canvasIdx = html.indexOf('id="canvas"');

assert('Toolbar is inside canvas-container (toolbar after container opening)', toolbarIdx > containerIdx);
assert('Canvas is after toolbar in DOM order', canvasIdx > toolbarIdx);

const canvasContainerCss = html.match(/#canvas-container\s*\{([^}]*)\}/);
assert('#canvas-container CSS block exists', !!canvasContainerCss);
assert('#canvas-container has max-width: 800px', !!canvasContainerCss && canvasContainerCss[1].includes('max-width: 800px'));

const toolbarCss = html.match(/#toolbar\s*\{([^}]*)\}/);
assert('#toolbar CSS block exists', !!toolbarCss);
assert('#toolbar has display: flex (row layout)', !!toolbarCss && toolbarCss[1].includes('display: flex'));
assert('#toolbar has border-bottom: none (connects with canvas border)', !!toolbarCss && toolbarCss[1].includes('border-bottom: none'));

const canvasCss = html.match(/canvas\s*\{([^}]*)\}/);
assert('canvas does not have standalone max-width (controlled by container)', !!canvasCss && !canvasCss[1].includes('max-width'));

['btn-brown', 'btn-purple', 'btn-eraser', 'btn-clear'].forEach(id => {
  assert(`Toolbar has button #${id}`, html.includes(`id="${id}"`));
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
