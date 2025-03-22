import { createServer, Server } from 'http';

export class TestServer {
  private server: Server;
  private port: number;

  constructor(port: number = 3000) {
    this.port = port;
    this.server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>Test Page</h1></body></html>');
    });
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => {
        resolve();
      });
    });
  }
} 