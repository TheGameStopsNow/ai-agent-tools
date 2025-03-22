import { AIAgent, AccessibilityViolation, PerformanceMetrics } from '../src';

interface TestResult {
  accessibility: AccessibilityViolation[];
  performance: {
    metrics: PerformanceMetrics;
    thresholds: Record<string, number>;
    passed: boolean;
  };
  screenshots: {
    passed: boolean;
    diffPercentage: number;
  };
}

async function runCITests(): Promise<TestResult> {
  const agent = new AIAgent({
    baseUrl: process.env.TEST_URL || 'http://localhost:3000',
    screenshotDir: './screenshots',
    defaultTimeout: 30000,
    axeConfig: {
      rules: {
        'color-contrast': { enabled: true },
        'document-title': { enabled: true },
        'landmark-one-main': { enabled: true }
      }
    },
    performanceThresholds: {
      firstPaint: 1000,
      firstContentfulPaint: 2000,
      domContentLoaded: 3000,
      loadTime: 4000
    }
  });

  const result: TestResult = {
    accessibility: [],
    performance: {
      metrics: {
        firstPaint: 0,
        firstContentfulPaint: 0,
        domContentLoaded: 0,
        loadTime: 0,
        timestamp: new Date().toISOString()
      },
      thresholds: agent['config'].performanceThresholds || {},
      passed: true
    },
    screenshots: {
      passed: true,
      diffPercentage: 0
    }
  };

  try {
    await agent.initialize();

    // Test homepage
    await agent.navigate('/');
    
    // Accessibility check
    const violations = await agent.checkAccessibility('/');
    result.accessibility = violations;

    // Performance check
    const metrics = await agent.getPerformanceMetrics();
    result.performance.metrics = metrics;
    
    // Check against thresholds
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'timestamp' && 
          result.performance.thresholds[key] && 
          typeof value === 'number') {
        if (value > result.performance.thresholds[key]) {
          result.performance.passed = false;
        }
      }
    });

    // Visual regression test
    await agent.takeScreenshot('homepage');
    const comparison = await agent.compareScreenshots('homepage', 'homepage-baseline');
    result.screenshots.diffPercentage = comparison.misMatchPercentage;
    result.screenshots.passed = comparison.misMatchPercentage < 1;

  } catch (error) {
    console.error('CI Test Error:', error);
    throw error;
  } finally {
    await agent.cleanup();
  }

  return result;
}

// Run tests and exit with appropriate status code
runCITests()
  .then(result => {
    console.log('CI Test Results:', JSON.stringify(result, null, 2));
    
    // Exit with error if any tests failed
    if (result.accessibility.length > 0 ||
        !result.performance.passed ||
        !result.screenshots.passed) {
      process.exit(1);
    }
    
    process.exit(0);
  })
  .catch(error => {
    console.error('CI Test Failed:', error);
    process.exit(1);
  }); 