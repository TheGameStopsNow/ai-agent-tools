import { Browser, Page, launch } from 'puppeteer';
import { Result } from 'axe-core';
import Resemble, { ResembleSingleCallbackComparisonResult } from 'resemblejs';
import {
  AIAgentConfig,
  AccessibilityViolation,
  PerformanceMetrics,
  ComparisonResult,
  AIAgentInstance,
} from './types';

// Extend the Window interface to include axe
declare global {
  interface Window {
    axe: {
      run: () => Promise<{
        violations: Result[];
      }>;
    };
  }
}

export class AIAgent implements AIAgentInstance {
  browser!: Browser;
  page!: Page;
  config: AIAgentConfig;

  constructor(config: AIAgentConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    this.browser = await launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    this.page = await this.browser.newPage();
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(`${this.config.baseUrl}${path}`, {
      waitUntil: 'networkidle0',
      timeout: this.config.defaultTimeout,
    });
  }

  async checkAccessibility(path: string): Promise<AccessibilityViolation[]> {
    await this.navigate(path);
    const axe = await import('axe-core');
    await this.page.evaluate(axeSource => {
      const script = document.createElement('script');
      script.text = axeSource;
      document.head.appendChild(script);
    }, axe.source);

    const results = await this.page.evaluate(() => {
      return window.axe.run();
    });
    
    return results.violations.map((violation: Result): AccessibilityViolation => ({
      id: violation.id,
      impact: violation.impact as AccessibilityViolation['impact'],
      description: violation.description,
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodes: violation.nodes.map(node => ({
        html: node.html,
        target: node.target as string[],
        failureSummary: node.failureSummary || '',
      })),
    }));
  }

  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const metrics = await this.page.evaluate(() => {
      const timing = window.performance.timing;
      return {
        firstPaint: window.performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: window.performance.getEntriesByType('paint')[1]?.startTime || 0,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadTime: timing.loadEventEnd - timing.navigationStart,
      };
    });

    return {
      ...metrics,
      timestamp: new Date().toISOString(),
    };
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `${this.config.screenshotDir}/${name}.png`,
      fullPage: true,
    });
  }

  async compareScreenshots(name1: string, name2: string): Promise<ComparisonResult> {
    const path1 = `${this.config.screenshotDir}/${name1}.png`;
    const path2 = `${this.config.screenshotDir}/${name2}.png`;
    const diffPath = `${this.config.screenshotDir}/diff-${name1}-${name2}.png`;

    return new Promise<ComparisonResult>((resolve, reject) => {
      Resemble.compare(path1, path2, {
        ignore: 'antialiasing',
        output: {
          errorColor: {
            red: 255,
            green: 0,
            blue: 0
          },
          transparency: 1
        }
      }, (err: unknown, data: ResembleSingleCallbackComparisonResult) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          misMatchPercentage: parseFloat(data.misMatchPercentage),
          diffImagePath: diffPath,
          timestamp: new Date().toISOString(),
        });
      });
    });
  }

  async click(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { timeout: this.config.defaultTimeout });
    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector, { timeout: this.config.defaultTimeout });
    await this.page.type(selector, text);
  }
} 