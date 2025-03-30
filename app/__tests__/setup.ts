import '@testing-library/jest-dom';
import { expect, describe, it, jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Make these available globally
(global as any).expect = expect;
(global as any).describe = describe;
(global as any).it = it;
(global as any).jest = jest;

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock fetch
(global as any).fetch = jest.fn();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
  useServerInsertedHTML: () => null,
}));

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: () => new Map(),
  cookies: () => new Map(),
}));

// Mock zustand
jest.mock('zustand', () => ({
  create: (fn: any) => {
    const store = fn();
    return {
      ...store,
      setState: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
      destroy: jest.fn(),
    };
  },
}));

// Mock axios
jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

// Mock WebSocket
class MockWebSocket implements WebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  readonly CONNECTING: 0 = 0;
  readonly OPEN: 1 = 1;
  readonly CLOSING: 2 = 2;
  readonly CLOSED: 3 = 3;

  binaryType: BinaryType = 'blob';
  bufferedAmount = 0;
  extensions = '';
  protocol = '';
  url = '';
  readyState: number;

  onmessage: ((event: MessageEvent) => void) | null = null;
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(url: string | URL, _protocols?: string | string[]) {
    this.url = url.toString();
    this.readyState = MockWebSocket.CONNECTING;
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      if (this.onopen) this.onopen(new Event('open'));
    }, 0);
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    // Mock implementation
  }

  close(code?: number, reason?: string) {
    this.readyState = MockWebSocket.CLOSING;
    setTimeout(() => {
      this.readyState = MockWebSocket.CLOSED;
      if (this.onclose) this.onclose(new CloseEvent('close', { code, reason }));
    }, 0);
  }

  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (event: WebSocketEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    switch (type) {
      case 'message':
        this.onmessage = listener as (event: MessageEvent) => void;
        break;
      case 'open':
        this.onopen = listener as (event: Event) => void;
        break;
      case 'close':
        this.onclose = listener as (event: CloseEvent) => void;
        break;
      case 'error':
        this.onerror = listener as (event: Event) => void;
        break;
    }
  }

  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (event: WebSocketEventMap[K]) => void,
    options?: boolean | EventListenerOptions
  ): void {
    switch (type) {
      case 'message':
        this.onmessage = null;
        break;
      case 'open':
        this.onopen = null;
        break;
      case 'close':
        this.onclose = null;
        break;
      case 'error':
        this.onerror = null;
        break;
    }
  }

  dispatchEvent(event: Event): boolean {
    return true;
  }
}

(global as any).WebSocket = MockWebSocket;

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockImplementation(() => Promise.resolve({
      messageId: 'test-message-id',
      response: 'test-response',
      accepted: ['test@example.com'],
      rejected: [],
      pending: [],
      envelope: { from: 'from@example.com', to: ['to@example.com'] }
    })),
  })),
}));

// Mock FormData
global.FormData = jest.fn(() => ({
  append: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  set: jest.fn(),
  forEach: jest.fn(),
})) as unknown as typeof FormData;

// Mock URL.createObjectURL
(global.URL.createObjectURL as jest.Mock) = jest.fn().mockReturnValue('mock-object-url');
(global.URL.revokeObjectURL as jest.Mock) = jest.fn();

// Set up DOM environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
}); 