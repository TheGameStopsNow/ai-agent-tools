import { Browser, Page } from 'puppeteer';
import { Result } from 'axe-core';

export interface AIAgentConfig {
  baseUrl: string;
  screenshotDir: string;
  defaultTimeout: number;
  axeConfig?: {
    rules?: Record<
      string,
      {
        enabled: boolean;
      }
    >;
  };
  performanceThresholds?: {
    firstPaint: number;
    firstContentfulPaint: number;
    domContentLoaded: number;
    loadTime: number;
  };
}

export interface AccessibilityViolation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

export interface PerformanceMetrics {
  firstPaint: number;
  firstContentfulPaint: number;
  domContentLoaded: number;
  loadTime: number;
  timestamp: string;
}

export interface ComparisonResult {
  misMatchPercentage: number;
  diffImagePath: string;
  timestamp: string;
}

export interface AIAgentInstance {
  browser: Browser;
  page: Page;
  config: AIAgentConfig;
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
  navigate(path: string): Promise<void>;
  checkAccessibility(path: string): Promise<AccessibilityViolation[]>;
  getPerformanceMetrics(): Promise<PerformanceMetrics>;
  takeScreenshot(name: string): Promise<void>;
  compareScreenshots(name1: string, name2: string): Promise<ComparisonResult>;
  click(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
} 