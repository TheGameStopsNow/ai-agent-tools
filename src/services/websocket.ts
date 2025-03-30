import { WSServer, WebSocketClient } from '../types/websocket';

export class WebSocketService {
  private wss: WSServer;
  private storyClients: Map<string, Set<WebSocketClient>>;

  constructor() {
    this.wss = {
      on: jest.fn(),
      clients: new Set(),
      close: jest.fn(),
      handleUpgrade: jest.fn(),
      emit: jest.fn(),
    };
    this.storyClients = new Map();
    this.setupWebSocketServer();
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws: WebSocketClient) => {
      this.wss.clients.add(ws);
      ws.on('message', (message: string) => this.handleMessage(ws, message));
      ws.on('close', () => this.handleDisconnect(ws));
      ws.on('error', (error: Error) => this.handleError(ws, error));
    });
  }

  public broadcastProgress(storyId: string, progress: number) {
    const clients = this.storyClients.get(storyId);
    if (!clients) return;

    const message = JSON.stringify({ type: 'progress', storyId, progress });
    clients.forEach(client => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(message);
      }
    });
  }

  public handleDisconnect(client: WebSocketClient) {
    this.wss.clients.delete(client);
    this.storyClients.forEach((clients, storyId) => {
      clients.delete(client);
      if (clients.size === 0) {
        this.storyClients.delete(storyId);
      }
    });
  }

  public handleError(client: WebSocketClient, error: Error) {
    console.error('WebSocket error:', error);
    this.handleDisconnect(client);
  }

  public handleMessage(client: WebSocketClient, message: string) {
    try {
      const data = JSON.parse(message);
      if (data.type === 'subscribe') {
        const { storyId } = data;
        if (!this.storyClients.has(storyId)) {
          this.storyClients.set(storyId, new Set());
        }
        this.storyClients.get(storyId)?.add(client);
      }
      client.send(JSON.stringify({ type: 'ack', data }));
    } catch (error) {
      console.error('Error handling message:', error);
      client.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  }
} 