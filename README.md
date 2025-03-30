# AI Agent Tools

A comprehensive toolkit for automated testing, accessibility checking, and performance monitoring. This package provides a suite of tools designed to help developers ensure their applications meet high standards for accessibility, performance, and reliability.

## Features

### Accessibility Testing
- Automated accessibility checks using axe-core
- Detailed violation reporting with severity levels
- Support for custom rules and configurations
- Integration with CI/CD pipelines

### Performance Monitoring
- Real-time performance metrics collection
- Core Web Vitals tracking
- Custom performance thresholds
- Historical performance data analysis

### Screenshot Capture
- Automated screenshot capture
- Visual regression testing
- Baseline image management
- Pixel-perfect comparison tools

### End-to-End Testing
- Comprehensive E2E test capabilities
- Page navigation and interaction
- Form filling and validation
- Network request monitoring

### Dynamic Timeouts
- Smart timeout management
- Configurable wait times
- Automatic retry mechanisms
- Network condition simulation

## Installation

```bash
npm install @thegamestopsnow/ai-agent-tools
```

For local development:

```bash
npm install file:/path/to/ai-agent-tools
```

## Quick Start

```typescript
import { AIAgent } from '@thegamestopsnow/ai-agent-tools';

// Initialize the agent with configuration
const agent = new AIAgent({
  baseUrl: 'http://localhost:3000',
  screenshotDir: './screenshots',
  defaultTimeout: 30000, // 30 seconds
  axeConfig: {
    rules: {
      'color-contrast': { enabled: true },
      'document-title': { enabled: true }
    }
  }
});

// Run accessibility checks
const violations = await agent.checkAccessibility('/');
console.log(`Found ${violations.length} accessibility issues`);
violations.forEach(violation => {
  console.log(`- ${violation.impact.toUpperCase()}: ${violation.description}`);
});

// Monitor performance
const metrics = await agent.getPerformanceMetrics();
console.log('Performance Metrics:', {
  firstPaint: `${metrics.firstPaint}ms`,
  firstContentfulPaint: `${metrics.firstContentfulPaint}ms`,
  domContentLoaded: `${metrics.domContentLoaded}ms`,
  loadTime: `${metrics.loadTime}ms`
});

// Take and compare screenshots
await agent.takeScreenshot('homepage');
const diff = await agent.compareScreenshots('homepage', 'homepage-baseline');
if (diff.misMatchPercentage > 0) {
  console.log(`Visual differences detected: ${diff.misMatchPercentage}%`);
}
```

## API Reference

### AIAgent

The main class for interacting with the toolkit.

#### Constructor Options

```typescript
interface AIAgentOptions {
  baseUrl: string;              // Base URL for the application
  screenshotDir?: string;       // Directory for storing screenshots
  defaultTimeout?: number;      // Default timeout in milliseconds
  axeConfig?: AxeConfig;        // axe-core configuration
  performanceThresholds?: {     // Performance thresholds
    firstPaint: number;
    firstContentfulPaint: number;
    domContentLoaded: number;
    loadTime: number;
  };
}
```

#### Methods

##### Accessibility Testing
```typescript
checkAccessibility(path: string): Promise<AccessibilityViolation[]>
```

##### Performance Monitoring
```typescript
getPerformanceMetrics(): Promise<PerformanceMetrics>
```

##### Screenshot Management
```typescript
takeScreenshot(name: string): Promise<void>
compareScreenshots(name1: string, name2: string): Promise<ComparisonResult>
```

##### Navigation and Interaction
```typescript
navigate(path: string): Promise<void>
click(selector: string): Promise<void>
type(selector: string, text: string): Promise<void>
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/TheGameStopsNow/ai-agent-tools.git
cd ai-agent-tools
```

2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Legal Notice

Market manipulation is a federal crime. If you suspect market manipulation, report it to the SEC:
[www.sec.gov/tcr](https://www.sec.gov/tcr)

Together we can promote fair markets and protect retail investors.

## Configuration

The application can be configured through:
- Settings view in the dashboard
- Environment variables
- Configuration files in `config/`

## Acknowledgments

- Built with Streamlit and DaisyUI
- Market data provided by various sources
- Community contributions and feedback

# StoryForge

StoryForge is an advanced platform for interactive storytelling and choose-your-own-adventure style narratives. It provides authors with powerful tools to create, visualize, and analyze branching narratives.

## Features

- Interactive story creation with branching paths
- Golden Path visualization and optimization
- AI-assisted story analysis and recommendations
- Reader feedback collection and analysis
- Quality metrics and trend analysis
- Email notifications for author engagement

## Latest Updates

### Golden Path Feedback System

The Golden Path Feedback System allows readers to provide targeted feedback on specific story branches. Authors can view analytics, trends, and AI-generated recommendations based on reader feedback.

Key features:
- Detailed feedback statistics with rating distribution
- Time-based trend analysis for quality metrics
- AI-assisted recommendations for story improvements
- Email notifications for new feedback

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (.env file)
4. Run the development server: `npm run dev`

## Documentation

For more detailed documentation on features and implementation, see the [docs](./docs) directory.
