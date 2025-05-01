import WebSocket from 'ws';

// Um objeto simples para armazenar os clientes conectados
const clients: Map<string, WebSocket> = new Map();

// Função para registrar um cliente, associando-o a um identificador (como o ID do usuário)
export const registerClient = (ws: WebSocket): void => {
  const userId = generateUniqueId(); // Você pode usar um ID real ou gerar um ID único
  clients.set(userId, ws);
  console.log(`Cliente ${userId} registrado`);
};

// Função para enviar uma mensagem privada para um cliente
export const sendPrivateMessage = (message: any): void => {
  const { to, content } = message; // Destinatário e conteúdo da mensagem
  const recipientWs = clients.get(to);

  if (recipientWs) {
    recipientWs.send(JSON.stringify({ type: 'private_message', content }));
    console.log(`Mensagem privada enviada para ${to}`);
  } else {
    console.log(`Cliente ${to} não encontrado`);
  }
};

// Função para gerar um ID único (exemplo)
const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9); // Gera um ID aleatório
};
