import { AIAgent } from '../src';

async function main() {
  // Initialize the agent with configuration
  const agent = new AIAgent({
    baseUrl: 'http://localhost:3000',
    screenshotDir: './screenshots',
    defaultTimeout: 30000,
    axeConfig: {
      rules: {
        'color-contrast': { enabled: true },
        'document-title': { enabled: true }
      }
    },
    performanceThresholds: {
      firstPaint: 1000,
      firstContentfulPaint: 2000,
      domContentLoaded: 3000,
      loadTime: 4000
    }
  });

  try {
    // Initialize the browser
    await agent.initialize();

    // Navigate to the homepage
    await agent.navigate('/');

    // Check accessibility
    const violations = await agent.checkAccessibility('/');
    console.log('Accessibility Violations:', violations);

    // Get performance metrics
    const metrics = await agent.getPerformanceMetrics();
    console.log('Performance Metrics:', metrics);

    // Take a screenshot
    await agent.takeScreenshot('homepage');

    // Compare with baseline
    const comparison = await agent.compareScreenshots('homepage', 'homepage-baseline');
    console.log('Screenshot Comparison:', comparison);

    // Interact with the page
    await agent.click('#submit-button');
    await agent.type('#search-input', 'test query');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up resources
    await agent.cleanup();
  }
}

main().catch(console.error); 