import { useState, useEffect, useRef } from "react";
import { ChatMessage, ChatMessageRequest } from "types/Chat";

export default function useChat(chamadoId: string, userId: string) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Ativa o carregamento
    setLoading(true);
    ws.current = new WebSocket(`ws://localhost:5000/`);

    ws.current.onopen = () => {
      console.log("Conexão estabelecida com o WebSocket");
      // Envia a mensagem de registro para o servidor
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
          console.log("Mensagem recebida:", message);
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
        default:
          console.log("Tipo de mensagem desconhecido:", message.type);
          break;
      }
    };

    ws.current.onerror = () => {
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
  }, [chamadoId, userId]);

  console.log("history", history);

  function sendMessage(message: string) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData: ChatMessageRequest = {
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
