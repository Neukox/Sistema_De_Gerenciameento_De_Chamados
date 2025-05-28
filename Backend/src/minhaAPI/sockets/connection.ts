import { Server as WebSocketServer } from "ws";
import http from "http";
import RespostaServices from "../respostas/services";
import {
  registerClient,
  sendMessageToChamado,
  unregisterClient,
} from "./privateMessageHandler";
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
          const historico = await RespostaServices.getAllByChamadoId(
            message.chamado_id
          );

          // Envia o histórico de mensagens para o cliente
          socket.send(
            JSON.stringify({
              type: "historico",
              chamado_id: message.chamado_id,
              historico: historico?.map((msg) => ({
                usuario_id: msg.usuario_id,
                de: msg.usuario?.nome || "Desconhecido",
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
          await RespostaServices.save({
            chamado_id: message.chamado_id,
            usuario_id: message.usuario_id,
            mensagem: message.conteudo,
          });

          // Recupera a ultima mensagem do banco de dados
          const ultimaMensagem = await RespostaServices.lastByChamadoId(
            message.chamado_id
          );
          // Envia a mensagem para todos os clientes registrados
          // no chamado específico
          sendMessageToChamado(message.chamado_id, {
            type: "chat_message",
            usuario_id: message.usuario_id,
            de: ultimaMensagem?.usuario?.nome || "Desconhecido",
            conteudo: ultimaMensagem?.mensagem,
            data_envio: formatDate(ultimaMensagem?.data_envio as Date),
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
