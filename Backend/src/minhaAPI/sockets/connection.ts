import { Server as WebSocketServer } from "ws";
import http from "http";
import {
  registerClient,
  sendMessageToChamado,
  unregisterClient,
} from "./privateMessageHandler";
import {
  buscarMensagensPorChamadoId,
  buscarUltimaMensagemPorChamadoId,
  salvarMensagem,
} from "../bancodedados/respostasRepo";
import formatDate from "../utils/dateConverter";

export function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("🔌 Novo cliente WebSocket conectado");

    socket.on("message", async (data) => {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case "register":
          // Registra o cliente no chamado
          // e no usuário
          registerClient(socket, message.chamado_id, message.usuario_id);

          // Envia o histórico de mensagens do chamado
          const historico = await buscarMensagensPorChamadoId(
            message.chamado_id
          );

          // Envia o histórico de mensagens para o cliente
          socket.send(
            JSON.stringify({
              type: "historico",
              chamado_id: message.chamado_id,
              historico: historico?.map((msg) => ({
                de: msg.de,
                conteudo: msg.mensagem,
                data_envio: formatDate(msg.data_envio),
              })),
            })
          );
          break;
        case "unregister":
          // Desregistra o cliente do chamado
          // e do usuário
          unregisterClient(message.chamado_id, message.usuario_id);
          break;
        case "chat_message":
          // Salva a mensagem no banco de dados
          await salvarMensagem(
            message.chamado_id,
            message.usuario_id,
            message.conteudo
          );

          // Recupera a ultima mensagem do banco de dados
          const ultimaMensagem = await buscarUltimaMensagemPorChamadoId(
            message.chamado_id
          );
          // Envia a mensagem para todos os clientes registrados
          // no chamado específico
          sendMessageToChamado(message.chamado_id, {
            de: ultimaMensagem?.de,
            conteudo: ultimaMensagem?.mensagem,
            data_envio: formatDate(ultimaMensagem?.data_envio as string),
          });

          break;
        default:
          console.log("Tipo de mensagem desconhecido:", message.type);
          break;
      }
    });

    socket.on("close", () => {
      console.log("🔌 Cliente WebSocket desconectado");
    });

    socket.send("👋 Conexão WebSocket estabelecida!");
  });
}
