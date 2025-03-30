import { WebSocketService } from '../websocket';
import type { WebSocket } from '../../types/websocket';

describe('WebSocketService', () => {
  let wsService: WebSocketService;
  let mockServer: {
    on: jest.Mock;
    clients: Set<WebSocket>;
    close: jest.Mock;
    handleUpgrade: jest.Mock;
    emit: jest.Mock;
  };

  beforeEach(() => {
    mockServer = {
      on: jest.fn(),
      clients: new Set(),
      close: jest.fn(),
      handleUpgrade: jest.fn(),
      emit: jest.fn(),
    };

    wsService = new WebSocketService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize correctly', () => {
    expect(wsService).toBeDefined();
  });

  it('should broadcast progress', () => {
    const storyId = 'story123';
    const progress = 50;
    const mockClient: WebSocket = {
      send: jest.fn(),
      readyState: 1,
      close: jest.fn(),
      on: jest.fn(),
    };

    // Add client to story clients
    (wsService as any).storyClients.set(storyId, new Set([mockClient]));

    wsService.broadcastProgress(storyId, progress);
    expect(mockClient.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'progress', storyId, progress })
    );
  });

  it('should handle client disconnection', () => {
    const mockClient: WebSocket = {
      send: jest.fn(),
      readyState: 1,
      close: jest.fn(),
      on: jest.fn(),
    };

    // Add client to server clients
    (wsService as any).wss.clients.add(mockClient);

    wsService.handleDisconnect(mockClient);
    expect((wsService as any).wss.clients.has(mockClient)).toBe(false);
  });

  it('should handle client error', () => {
    const mockClient: WebSocket = {
      send: jest.fn(),
      readyState: 1,
      close: jest.fn(),
      on: jest.fn(),
    };
    const mockError = new Error('Test error');

    // Add client to server clients
    (wsService as any).wss.clients.add(mockClient);

    wsService.handleError(mockClient, mockError);
    expect((wsService as any).wss.clients.has(mockClient)).toBe(false);
  });

  it('should handle client message', () => {
    const mockClient: WebSocket = {
      send: jest.fn(),
      readyState: 1,
      close: jest.fn(),
      on: jest.fn(),
    };
    const mockMessage = JSON.stringify({ type: 'subscribe', storyId: 'story123' });

    wsService.handleMessage(mockClient, mockMessage);
    expect(mockClient.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'ack', data: { type: 'subscribe', storyId: 'story123' } })
    );
  });
}); 