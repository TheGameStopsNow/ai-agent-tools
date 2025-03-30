import { AIAgent } from '../AIAgent';
import { TestServer } from './test-server';
import { mkdirSync, existsSync } from 'fs';

// Mock puppeteer
jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      goto: jest.fn(),
      screenshot: jest.fn(),
      evaluate: jest.fn(),
      close: jest.fn(),
    }),
    close: jest.fn(),
  }),
}));

describe('AIAgent', () => {
  let agent: AIAgent;
  let server: TestServer;

  beforeAll(() => {
    // Create screenshots directory if it doesn't exist
    if (!existsSync('./screenshots')) {
      mkdirSync('./screenshots', { recursive: true });
    }
  });

  beforeEach(async () => {
    server = new TestServer();
    await server.start();
    agent = new AIAgent({
      baseUrl: 'http://localhost:3000',
      screenshotDir: './screenshots',
      defaultTimeout: 30000,
    });
  });

  afterEach(async () => {
    await agent.cleanup();
    await server.stop();
  });

  describe('initialization', () => {
    it('should initialize with default config', () => {
      const agent = new AIAgent({
        baseUrl: 'http://localhost:3000',
        screenshotDir: './screenshots',
        defaultTimeout: 30000,
      });
      expect(agent).toBeDefined();
    });

    it('should initialize with custom config', () => {
      const agent = new AIAgent({
        baseUrl: 'http://localhost:3000',
        screenshotDir: './custom-screenshots',
        defaultTimeout: 5000,
      });
      expect(agent).toBeDefined();
    });
  });

  describe('browser management', () => {
    it('should initialize browser', async () => {
      await agent.initialize();
      expect(agent).toBeDefined();
    });

    it('should cleanup resources', async () => {
      await agent.initialize();
      await agent.cleanup();
      expect(agent).toBeDefined();
    });
  });

  describe('navigation', () => {
    it('should navigate to a page', async () => {
      await agent.initialize();
      await agent.navigate('/');
      expect(agent).toBeDefined();
    });
  });

  describe('screenshot management', () => {
    it('should take a screenshot', async () => {
      await agent.initialize();
      await agent.takeScreenshot('test');
      expect(agent).toBeDefined();
    });

    it('should compare screenshots', async () => {
      await agent.initialize();
      await agent.takeScreenshot('test1');
      await agent.takeScreenshot('test2');
      const result = await agent.compareScreenshots('test1', 'test2');
      expect(result).toHaveProperty('misMatchPercentage');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('accessibility testing', () => {
    it('should check accessibility', async () => {
      await agent.initialize();
      const violations = await agent.checkAccessibility('/');
      expect(Array.isArray(violations)).toBe(true);
    });
  });

  describe('performance monitoring', () => {
    it('should get performance metrics', async () => {
      await agent.initialize();
      const metrics = await agent.getPerformanceMetrics();
      expect(metrics).toHaveProperty('firstPaint');
      expect(metrics).toHaveProperty('firstContentfulPaint');
      expect(metrics).toHaveProperty('domContentLoaded');
      expect(metrics).toHaveProperty('loadTime');
      expect(metrics).toHaveProperty('timestamp');
    });
  });
}); 