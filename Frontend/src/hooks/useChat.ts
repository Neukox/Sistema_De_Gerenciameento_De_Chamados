import { useToast } from "@context/ToastContext";
import { useState, useEffect, useRef } from "react";
import { ChatMessage, SocketMessage } from "types/Chat";

/**
 * Hook para gerenciar o chat de um chamado específico.
 *
 * Este hook estabelece uma conexão WebSocket com o servidor para enviar e receber mensagens
 * relacionadas a um chamado específico, identificado por `chamadoId` e `userId`.
 *
 * @param {number} chamadoId - ID do chamado para o qual o chat está sendo gerenciado.
 * @param {number} userId - ID do usuário que está participando do chat.
 * @returns {Object} Um objeto contendo o histórico de mensagens, uma função para enviar mensagens e um estado de carregamento.
 */
export default function useChat(chamadoId: number, userId: number) {
  // Estado para armazenar o histórico de mensagens do chat
  const [history, setHistory] = useState<ChatMessage[]>([]);
  // Estado para controlar o carregamento do chat
  const [loading, setLoading] = useState(true);
  // Referência para o WebSocket
  const ws = useRef<WebSocket | null>(null);
  // Hook para exibir mensagens de erro
  const toast = useToast();

  // Hook de efeito para estabelecer a conexão WebSocket
  useEffect(() => {
    // Ativa o carregamento
    setLoading(true);
    ws.current = new WebSocket(`ws://localhost:5000/`);

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          type: "register",
          usuario_id: userId,
          chamado_id: chamadoId,
        })
      );
    };

    ws.current.onmessage = (event) => {
      let message;

      try {
        message = JSON.parse(event.data);
      } catch (error) {
        setLoading(false);
        console.warn("Erro ao analisar a mensagem:", error);
        return;
      }

      switch (message.type) {
        case "historico":
          setHistory(message.historico || []);
          setLoading(false);
          break;
        case "chat_message":
          setHistory((prevHistory) => [
            ...prevHistory,
            {
              usuario_id: message.usuario_id,
              de: message.de,
              data_envio: message.data_envio,
              conteudo: message.conteudo,
            },
          ]);
          break;
        case "error":
          toast?.show({
            type: "error",
            message: message.error || "Erro desconhecido no servidor.",
            duration: 2000,
          });
          break;
        default:
          console.log("Tipo de mensagem desconhecido:", message.type);
          break;
      }
    };

    ws.current.onerror = () => {
      console.error("Erro na conexão WebSocket.");
      setLoading(false);
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current?.send(
          JSON.stringify({
            type: "unregister",
            usuario_id: userId,
            chamado_id: chamadoId,
          })
        );
      }
      ws.current?.close();
      ws.current = null;
    };
  }, [chamadoId, userId, toast]);

  function sendMessage(message: string) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData: SocketMessage = {
        type: "chat_message",
        chamado_id: chamadoId,
        usuario_id: userId,
        conteudo: message,
      };
      ws.current.send(JSON.stringify(messageData));
    } else {
      console.warn("WebSocket não está aberto. Mensagem não enviada.");
    }
  }

  return { history, sendMessage, loading };
}
