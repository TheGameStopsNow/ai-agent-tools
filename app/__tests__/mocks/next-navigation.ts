import { jest } from '@jest/globals';

export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
}));

export const usePathname = jest.fn(() => '');
export const useSearchParams = jest.fn(() => new URLSearchParams());
export const useServerInsertedHTML = jest.fn();
export const headers = jest.fn(() => new Headers());
export const cookies = jest.fn(() => ({
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
})); 