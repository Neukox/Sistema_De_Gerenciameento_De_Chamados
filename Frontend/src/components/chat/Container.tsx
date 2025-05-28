import { useEffect, useRef } from "react";
import Message from "./Message";
import Field from "@components/ui/form/Field";
import Input from "@components/ui/form/Input";
import Label from "@components/ui/form/Label";
import useUserInfo from "@hooks/useUserInfo";
import useChat from "@hooks/useChat";
import { useParams } from "react-router";
import Loading from "@components/ui/Loading";
import SendIcon from "@assets/icons/Send";

export default function ChatContainer() {
  // Hook para obter informações do usuário
  const user = useUserInfo();
  // convertendo o user.id para string
  const userId = user?.id;
  // Hook para obter os parâmetros da URL
  const params = useParams();

  // Faz uso do hook useChat para obter o histórico de mensagens e a função de envio
  const { history, sendMessage, loading } = useChat(
    Number(params.id),
    Number(userId)
  );
  // ref para o contêiner de mensagens
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito colateral para rolar o contêiner de mensagens para baixo
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Função chamada ao enviar o formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (message.trim() === "") return;

    sendMessage(message);
    e.currentTarget.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Chat</h2>
      <div
        className="h-120 bg-base-100 rounded-xl p-3 overflow-y-auto flex flex-col gap-4"
        ref={containerRef}
      >
        {loading && <Loading />}
        {history.map((message, index) => (
          <Message
            key={message.data_envio + index}
            message={message}
            className={
              message.de === user?.name
                ? "bg-accent text-base-200 md:self-start"
                : "bg-base-200 text-base-content md:self-end"
            }
          />
        ))}
      </div>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Field className="flex-1">
          <Label htmlFor="message">Mensagem</Label>
          <Input
            type="text"
            id="message"
            name="message"
            placeholder="digite sua mensagem"
          />
        </Field>
        <button type="submit" className="btn btn-primary self-end">
          <SendIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}
