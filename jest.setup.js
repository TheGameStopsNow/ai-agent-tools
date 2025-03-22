// Increase timeout for all tests
jest.setTimeout(30000);

// Mock console.error to fail tests
const originalError = console.error;
console.error = (...args) => {
  originalError.call(console, ...args);
  throw new Error('Console error was called');
};

// Mock console.warn to fail tests
const originalWarn = console.warn;
console.warn = (...args) => {
  originalWarn.call(console, ...args);
  throw new Error('Console warn was called');
}; 