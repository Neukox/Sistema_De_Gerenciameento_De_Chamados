import WebSocket from "ws";

// Um objeto simples para armazenar os clientes conectados
const chamados: Map<string, Map<string, WebSocket>> = new Map();

/**
 *
 * Registra um cliente em um chamado específico.
 *
 * @param ws WebSocket
 * @param chamadoId ID do chamado
 * @param userId ID do usuário
 * @returns void
 */
export const registerClient = (
  ws: WebSocket,
  chamadoId: string,
  userId: string
): void => {
  if (!chamados.has(chamadoId)) {
    chamados.set(chamadoId, new Map());
  }
  const chamadoClients = chamados.get(chamadoId);
  chamadoClients?.set(userId, ws);

  console.log(`Usuário ${userId} registrado no chamado ${chamadoId}`);
};

/**
 *
 * Desregistra um cliente de um chamado específico.
 * @param chamadoId ID do chamado
 * @param userId ID do usuário
 * @returns void
 */
export const unregisterClient = (chamadoId: string, userId: string): void => {
  const chamadoClients = chamados.get(chamadoId);
  if (chamadoClients) {
    chamadoClients.delete(userId);
    console.log(`Usuário ${userId} desregistrado do chamado ${chamadoId}`);
  }
};

/**
 *
 * Envia uma mensagem para todos os clientes registrados em um chamado específico.
 *
 * @param chamadoId ID do chamado
 * @param message Mensagem a ser enviada
 * @returns void
 * */
export const sendMessageToChamado = (chamadoId: string, message: any): void => {
  const chamadoClients = chamados.get(chamadoId);
  console.log(
    `Enviando mensagem para o chamado ${chamadoId}: ${JSON.stringify(message)}`
  );

  if (chamadoClients) {
    chamadoClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
        console.log(`Mensagem enviada para o cliente no chamado ${chamadoId}`);
      } else {
        console.warn(
          `Cliente no chamado ${chamadoId} não está aberto. Mensagem não enviada.`
        );
      }
    });
  } else {
    console.log(`Nenhum cliente registrado para o chamado ${chamadoId}`);
  }
};
