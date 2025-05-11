type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Componente funcional React que renderiza um campo de entrada de texto.
 *
 * @component
 * @param {InputProps} props - Propriedades do componente.
 * @param {string} props.id - O ID do campo de entrada.
 * @param {string} props.type - O tipo do campo de entrada (por exemplo, "text", "password").
 * @param {string} props.placeholder - O texto de espaço reservado a ser exibido no campo de entrada.
 * @param {string} [props.className] - Classes CSS adicionais para estilização(opcional).
 * @returns {JSX.Element} O campo de entrada renderizado.
 * */
export default function Input({
  id,
  type,
  placeholder,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`input input-secondary rounded-none border-0 border-b-2 shadow-none focus:outline-0 hover:input-accent focus:outline-accent focus:input-accent w-full ${className}`}
      {...rest}
    />
  );
}
