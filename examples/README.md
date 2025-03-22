# AI Agent Tools Examples

This directory contains example implementations demonstrating how to use the AI Agent Tools package.

## Basic Usage

The `basic-usage.ts` example shows how to:
- Initialize the AIAgent with configuration
- Navigate to pages
- Check accessibility
- Monitor performance
- Take and compare screenshots
- Interact with page elements

To run the basic example:
```bash
npm install
npm run build
node dist/examples/basic-usage.js
```

## CI/CD Integration

The `ci-integration.ts` example demonstrates how to:
- Integrate AIAgent with CI/CD pipelines
- Run comprehensive tests including accessibility, performance, and visual regression
- Generate detailed test reports
- Handle test failures appropriately

To run the CI integration example:
```bash
npm install
npm run build
node dist/examples/ci-integration.js
```

## Configuration

Both examples can be configured through environment variables:
- `TEST_URL`: The base URL to test (defaults to http://localhost:3000)
- `SCREENSHOT_DIR`: Directory for storing screenshots (defaults to ./screenshots)
- `DEFAULT_TIMEOUT`: Default timeout in milliseconds (defaults to 30000)

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
- Chrome/Chromium (for Puppeteer)

## Notes

- Make sure to create the screenshots directory before running the examples
- The CI integration example will exit with status code 1 if any tests fail
- Visual regression tests require baseline screenshots to be present 