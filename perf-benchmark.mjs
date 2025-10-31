// perf-benchmark.mjs
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher'; 
import fs from 'fs';

async function runAudit() {
  const url = 'https://heavens-above-nine.vercel.app/'; 

  let chrome = null;
  try {
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] });
    const options = { logLevel: 'info', output: 'json', port: chrome.port };
    const runnerResult = await lighthouse(url, options);

    const perfScore = Math.round((runnerResult.lhr.categories.performance.score || 0) * 100);
    const accessibilityScore = Math.round((runnerResult.lhr.categories.accessibility.score || 0) * 100);
    const bestPracticesScore = Math.round((runnerResult.lhr.categories['best-practices'].score || 0) * 100);
    const seoScore = Math.round((runnerResult.lhr.categories.seo.score || 0) * 100);

    const summary = `### 🚀 Performance Benchmark Report
**URL:** ${url}
- Performance: ${perfScore}%
- Accessibility: ${accessibilityScore}%
- Best Practices: ${bestPracticesScore}%
- SEO: ${seoScore}%
`;

    fs.writeFileSync('perf-report.md', summary);
    console.log(summary);

  } catch (err) {
    console.error('Error running Lighthouse:', err);
    fs.writeFileSync('perf-report.md', `### ⚠️ Performance Benchmark Failed\n\n${err.message}\n`);
    process.exitCode = 1;
  } finally {
    if (chrome) await chrome.kill();
  }
}

runAudit();
