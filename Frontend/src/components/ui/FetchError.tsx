type FetchErrorProps = {
  title: string;
  message?: string;
  action?: () => void;
};

/**
 * @description Componente de erro para exibir mensagens de erro de fetch.
 * 
 * Esse componente é utilizado para mostrar mensagens de erro quando uma requisição falha.
 * Ele exibe um título, uma mensagem opcional e um botão de ação para tentar novamente.
 * 
 * @component
 * @param {string} title - Título da mensagem de erro.
 * @param {string} [message] - Mensagem de erro opcional.
 * @param {() => void} [action] - Função de ação opcional a ser chamada ao clicar no botão.
 * @returns {JSX.Element} O componente de erro renderizado.
 */
export default function FetchError({
  title,
  message,
  action,
}: FetchErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-60">
      <h3 className="text-2xl font-semibold text-red-500">{title}</h3>
      <p className="text-red-500">{message}</p>
      <button className="btn btn-primary mt-4" onClick={action}>
        Tentar novamente
      </button>
    </div>
  );
}
