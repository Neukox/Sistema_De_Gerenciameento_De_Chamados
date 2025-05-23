type NotFoundResourceProps = {
  message?: string;
};

/**
 * @description Componente de recurso não encontrado.
 *
 * Esse componente é utilizado para exibir uma mensagem quando um recurso não é encontrado.
 * Ele pode ser utilizado em diferentes partes da aplicação para indicar que o recurso solicitado
 * não está disponível ou não foi encontrado.
 *
 * @component
 * @param {string} [message] - Mensagem opcional a ser exibida.
 * @returns {JSX.Element} O componente de recurso não encontrado renderizado.
 */
export default function NotFoundResource({ message }: NotFoundResourceProps) {
  return (
    <div className="h-60 place-content-center">
      <p className="text-center">{message}</p>
    </div>
  );
}
