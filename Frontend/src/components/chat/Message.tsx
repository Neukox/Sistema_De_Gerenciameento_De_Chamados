import { ChatMessage } from "types/Chat";

type MessageProps = {
  message?: ChatMessage;
  className?: string;
};

export default function Message({ className, message }: MessageProps) {
  return (
    <div className={`md:w-1/2 px-2 py-2 rounded-sm ${className}`}>
      <span className="flex justify-between gap-2">
        <p className="font-bold text-xs text-ellipsis">{message?.de}</p>
        <p className="text-xs">{message?.data_envio}</p>
      </span>
      <p>{message?.conteudo}</p>
    </div>
  );
}
