import React from "react";

type TextareaProps = {
  id: string;
  placeholder: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Componente funcional React que renderiza uma área de texto estilizada.
 *
 * Este componente exibe uma área de texto com classes do Tailwind CSS para estilização.
 * Ele aceita propriedades adicionais para personalizar o comportamento e a aparência.
 *
 * @component
 * @param {TextareaProps} props - Propriedades do componente.
 * @param {string} props.id - O ID da área de texto.
 * @param {string} props.placeholder - O texto de espaço reservado exibido na área de texto.
 * @param {string} [props.className] - Classes CSS adicionais para estilização.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} [props.rest] - Propriedades adicionais para a área de texto.
 * @returns {JSX.Element} A área de texto renderizada.
 * */
export default function Textarea({
  id,
  placeholder,
  className,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`textarea textarea-secondary resize-none rounded-none border-0 border-b-2 shadow-none focus:outline-0 hover:input-accent focus:outline-accent focus:input-accent ${className}`}
      {...rest}
    ></textarea>
  );
}
