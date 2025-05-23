Esta documentação explica como funciona o código do sistema de chat para chamados, permitindo a comunicação entre usuários e atendentes em tempo real.

## Funcionalidade do Código

O código implementa um sistema de chat em tempo real utilizando WebSockets. O sistema permite que usuários e atendentes se comuniquem através de mensagens instantâneas, facilitando a resolução de chamados.

#### Cógido responsável por gerenciar as conexões WebSocket e as mensagens trocadas entre os usuários e atendentes.

Utiliza um Map para armazenar os chamados e as conexões WebSocket associadas a cada chamado. Cada chamado é identificado por um ID único, e cada conexão WebSocket é associada a um usuário específico.

```Typescript
const chamados: Map<string, Map<string, WebSocket>> = new Map();
```

### Acesso ao Chat

Para acessar o chat, o usuário deve estar logado no sistema. O chat é acessível através do painel de controle do usuário, onde ele pode visualizar os chamados abertos e iniciar uma conversa com um atendente. Assim que o usuário clica em um chamado, ele é redirecionado para a página de chat, onde pode ver as mensagens trocadas e enviar novas mensagens.

#### Função de Acesso ao Chat

```Typescript
export const registerClient = ( ws: WebSocket, chamadoId: string, userId: string ): void => {
  if (!chamados.has(chamadoId)) {
    chamados.set(chamadoId, new Map());
  }
  const chamadoClients = chamados.get(chamadoId);
  chamadoClients?.set(userId, ws);

  console.log(`Usuário ${userId} registrado no chamado ${chamadoId}`);
};
```

### Envio de Mensagens

As mensagens podem ser enviadas tanto pelos usuários quanto pelos atendentes. Quando uma mensagem é enviada, ela é transmitida para todos os participantes do chamado, permitindo que todos vejam a conversa em tempo real.

#### Código de Envio de Mensagens

```Typescript
export const sendMessageToChamado = (chamadoId: string, message: any): void => {
  const chamadoClients = chamados.get(chamadoId);

  if (chamadoClients) {
    chamadoClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  } else {
    console.log(`Nenhum cliente registrado para o chamado ${chamadoId}`);
  }
};
```

### Saindo do Chat

Quando um usuário ou atendente sai do chat, a conexão WebSocket é fechada e o usuário é removido da lista de participantes do chamado. Isso garante que apenas os usuários ativos possam enviar e receber mensagens.

#### Código de Saída do Chat

```Typescript

export const unregisterClient = (chamadoId: string, userId: string): void => {
  const chamadoClients = chamados.get(chamadoId);
  if (chamadoClients) {
    chamadoClients.delete(userId);
    console.log(`Usuário ${userId} desregistrado do chamado ${chamadoId}`);
  }
};
```

### Persitência de Mensagens

As mensagens trocadas no chat são armazenadas em um banco de dados, permitindo que os usuários visualizem o histórico de conversas. Isso é útil para consultas futuras e para manter um registro das interações entre usuários e atendentes.

#### Código de Persistência de Mensagens

##### Recuperar Mensagens por Chamado

```Typescript
export const buscarMensagensPorChamadoId = async (
  chamadoId: string
): Promise<Mensagen[] | undefined> => {
  const db = await connectDB();
  try {
    const mensagens = await db.all<Mensagen[]>(
      "SELECT r.usuario_id, r.mensagem, r.data_envio, u.nome as de FROM respostas r JOIN usuarios u ON r.usuario_id = u.id WHERE r.chamado_id = ? ORDER BY r.data_envio ASC",
      [chamadoId]
    );

    return mensagens;
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
  } finally {
    await db.close();
  }
};
```

##### Persistir Mensagens

```Typescript
export const salvarMensagem = async (chamadoId: string, userId: string, conteudo: string): Promise<void> => {
  const db = await connectDB();
  try {
    await db.run(
      "INSERT INTO respostas (chamado_id, usuario_id, mensagem) VALUES (?, ?, ?)",
      [chamadoId, userId, conteudo]
    );
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
  } finally {
    await db.close();
  }
};
```

##### Recuperar Ultima Mensagem enviada ao chat

```Typescript
export const buscarUltimaMensagemPorChamadoId = async (chamadoId: string): Promise<Mensagen | undefined> => {
  const db = await connectDB();
  try {
    const mensagem = await db.get<Mensagen>(
      "SELECT r.mensagem, r.data_envio, u.nome as nome_usuario FROM respostas r JOIN usuarios u ON r.usuario_id = u.id WHERE r.chamado_id = ? ORDER BY r.data_envio DESC LIMIT 1",
      [chamadoId]
    );

    return mensagem;
  } catch (error) {
    console.error("Erro ao buscar última mensagem:", error);
  } finally {
    await db.close();
  }
};
```

### Cógido responsavel por gerenciar as mensagens enviadas pelos atendentes e usuários

```Typescript
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
                usuario_id: msg.usuario_id,
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
            type: "chat_message",
            usuario_id: message.usuario_id,
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
```

### Formatos para o envio de mensagens

#### Formato para Acesso ao Chat

```JSON
{
  "type": "register",
  "chamado_id": "1",
  "usuario_id": "6"
}
```

#### Formato para Saída do Chat

```JSON
{
  "type": "unregister",
  "chamado_id": "1",
  "usuario_id": "6"
}
```

#### Formato para Envio de Mensagens

```JSON
{
  "type": "chat_message",
  "chamado_id": "1",
  "usuario_id": "6",
  "conteudo": "Olá, como posso ajudar?"
}
```
