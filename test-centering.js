const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const tests = [
  {
    name: 'body has display: flex',
    pass: /body\s*\{[^}]*display\s*:\s*flex/s.test(html),
  },
  {
    name: 'body has flex-direction: column',
    pass: /body\s*\{[^}]*flex-direction\s*:\s*column/s.test(html),
  },
  {
    name: 'body has align-items: center (horizontal centering)',
    pass: /body\s*\{[^}]*align-items\s*:\s*center/s.test(html),
  },
  {
    name: 'body has justify-content: center (vertical centering)',
    pass: /body\s*\{[^}]*justify-content\s*:\s*center/s.test(html),
  },
  {
    name: 'body has min-height: 100vh',
    pass: /body\s*\{[^}]*min-height\s*:\s*100vh/s.test(html),
  },
];

let failed = 0;
for (const t of tests) {
  if (t.pass) {
    console.log(`PASS: ${t.name}`);
  } else {
    console.log(`FAIL: ${t.name}`);
    failed++;
  }
}

if (failed > 0) {
  console.log(`\n${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log(`\nAll ${tests.length} tests passed.`);
}
