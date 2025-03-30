import '@testing-library/jest-dom';

class MockWebSocket {
  constructor(url: string) {
    // Implementation not needed for tests
  }

  send(data: string) {
    // Implementation not needed for tests
  }

  close() {
    // Implementation not needed for tests
  }
}

global.WebSocket = MockWebSocket as any;

// Mock Puppeteer
jest.mock('puppeteer-core', () => ({
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