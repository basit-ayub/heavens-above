// perf-benchmark.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

(async () => {
  const url = 'https://heavens-above-nine.vercel.app/'; // Replace with your Vercel URL
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'json', port: chrome.port };
  const runnerResult = await lighthouse(url, options);

  const perfScore = runnerResult.lhr.categories.performance.score * 100;
  const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;
  const bestPracticesScore = runnerResult.lhr.categories['best-practices'].score * 100;
  const seoScore = runnerResult.lhr.categories.seo.score * 100;

  const summary = `
### 🚀 Performance Benchmark Report
**URL:** ${url}
- Performance: ${perfScore}%
- Accessibility: ${accessibilityScore}%
- Best Practices: ${bestPracticesScore}%
- SEO: ${seoScore}%
`;

  fs.writeFileSync('perf-report.md', summary);
  console.log(summary);

  await chrome.kill();
})();
