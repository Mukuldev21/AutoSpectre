import fs from 'fs';
import path from 'path';

const WORKFLOW_DIR = path.resolve('.github/workflows');
const WORKFLOW_FILE = path.join(WORKFLOW_DIR, 'autospectre-ci.yml');

const WORKFLOW_CONTENT = `name: AutoSpectre CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: lts/*

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run AutoSpectre Tests
      run: npm run test
      env:
        # Add any required env vars here (e.g. CI: true)
        CI: true

    - name: Upload Report
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
`;

export function setupCI() {
    console.log('👷 Setting up AutoSpectre CI/CD Pipeline...');

    if (!fs.existsSync(WORKFLOW_DIR)) {
        fs.mkdirSync(WORKFLOW_DIR, { recursive: true });
        console.log(`Created directory: ${WORKFLOW_DIR}`);
    }

    fs.writeFileSync(WORKFLOW_FILE, WORKFLOW_CONTENT);
    console.log(`✅ CI Workflow created at: ${WORKFLOW_FILE}`);
    console.log('\nNext Steps:');
    console.log('1. Commit and push this file to GitHub.');
    console.log('2. Go to the "Actions" tab in your repository to see your tests run automatically.');
}

// Execute if run directly
setupCI();
