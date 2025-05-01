import { Server as WebSocketServer } from 'ws';
import http from 'http';

export function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (socket) => {
    console.log('🔌 Novo cliente WebSocket conectado');
    
    socket.on('message', (message) => {
      console.log('📩 Mensagem recebida:', message.toString());
    });

    socket.send('👋 Conexão WebSocket estabelecida!');
  });
}
