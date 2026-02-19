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
assert('Has closing </head>', /<\/head>/i.test(html));
assert('Has <body> element', /<body>/i.test(html));
assert('Has closing </body>', /<\/body>/i.test(html));
assert('Has closing </html>', /<\/html>/i.test(html));

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
