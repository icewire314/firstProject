// test-css.js — verifies the <style> block in index.html
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

console.log('CSS style block tests\n');

// Structure
assert('<style> block exists in <head>', /<head[\s\S]*?<style[\s\S]*?<\/style>[\s\S]*?<\/head>/.test(html));

// Title
assert('h1 has prominent font-size (>=2rem)', (() => {
  const m = html.match(/h1\s*\{([^}]+)\}/);
  if (!m) return false;
  const fs = m[1].match(/font-size:\s*([\d.]+)(rem|px|em)/);
  if (!fs) return false;
  const v = parseFloat(fs[1]), u = fs[2];
  return (u === 'rem' && v >= 2) || (u === 'em' && v >= 2) || (u === 'px' && v >= 32);
})());
assert('h1 has font-weight set', /h1\s*\{[^}]*font-weight\s*:/.test(html));

// Reset
assert('* selector with box-sizing: border-box', /\*\s*\{[^}]*box-sizing\s*:\s*border-box/.test(html));

// Body
assert('body has background: #fff', /body\s*\{[^}]*background\s*:\s*#fff/.test(html));
assert('body has font-family: sans-serif', /body\s*\{[^}]*font-family\s*:\s*sans-serif/.test(html));
assert('body uses flexbox column layout', /body\s*\{[^}]*display\s*:\s*flex/.test(html));

// Toolbar
assert('#toolbar has display: flex', /#toolbar\s*\{[^}]*display\s*:\s*flex/.test(html));

// Buttons
assert('#toolbar button has color: #fff', /#toolbar\s+button\s*\{[^}]*color\s*:\s*#fff/.test(html));
assert('#toolbar button.active has outline', /#toolbar\s+button\.active\s*\{[^}]*outline/.test(html));

// Color buttons
assert('#btn-brown has background #795548', /#btn-brown\s*\{[^}]*background\s*:\s*#795548/.test(html));
assert('#btn-purple has background #7b1fa2', /#btn-purple\s*\{[^}]*background\s*:\s*#7b1fa2/.test(html));
assert('#btn-eraser has background #9e9e9e', /#btn-eraser\s*\{[^}]*background\s*:\s*#9e9e9e/.test(html));
assert('#btn-clear has background #e53935', /#btn-clear\s*\{[^}]*background\s*:\s*#e53935/.test(html));

// Canvas
assert('canvas has display: block', /canvas\s*\{[^}]*display\s*:\s*block/.test(html));
assert('canvas has width: 100%', /canvas\s*\{[^}]*width\s*:\s*100%/.test(html));
assert('canvas has max-width: 800px', /canvas\s*\{[^}]*max-width\s*:\s*800px/.test(html));
assert('canvas has a border', /canvas\s*\{[^}]*border\s*:/.test(html));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
