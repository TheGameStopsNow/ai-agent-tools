import { Mock } from 'jest';

export interface WSServer {
  on: Function;
  clients: Set<WebSocket>;
  close: Function;
  handleUpgrade: Function;
  emit: Function;
}

export interface MockWebSocket {
  send: Function;
  readyState: number;
  close: Function;
}

export interface WebSocket {
  send(data: string): void;
  readyState: number;
  on(event: string, callback: (...args: any[]) => void): void;
  close(): void;
  binaryType?: string;
  bufferedAmount?: number;
  extensions?: string;
  onclose?: ((event: any) => void) | null;
  onerror?: ((event: any) => void) | null;
  onmessage?: ((event: any) => void) | null;
  onopen?: ((event: any) => void) | null;
  protocol?: string;
  url?: string;
  addEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
  removeEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;
  dispatchEvent?: (event: Event) => boolean;
}

export type WebSocketClient = WebSocket; 