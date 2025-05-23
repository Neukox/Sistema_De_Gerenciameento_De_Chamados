import ChatContainer from "@components/chat/Container";
import { useParams } from "react-router";

export default function TicketChatPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="min-h-[calc(100vh-5.0625rem)] place-items-center p-4">
      <div className="w-full h-full max-w-screen-lg">
        <h1 className="mb-4">Chamado #{id}</h1>
        <div className="bg-base-200 h-full p-4 rounded-xl">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}
