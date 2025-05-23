import EyeIcon from "@assets/icons/Eye";
import EyeCloseIcon from "@assets/icons/EyeClose";
import React from "react";

type InputPasswordProps = {
  id: string;
  placeholder: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Componente funcional React que renderiza um campo de entrada de senha.
 *
 * @component
 * @param {InputPasswordProps} props - Propriedades do componente.
 * @param {string} props.id - O ID do campo de entrada.
 * @param {string} props.placeholder - O texto de espaço reservado a ser exibido no campo de entrada.
 * @param {string} [props.className] - Classes CSS adicionais para estilização (opcional).
 * @returns {JSX.Element} O campo de entrada renderizado.
 */
export default function Password({
  id,
  placeholder,
  className,
  ...rest
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={`input input-secondary rounded-none relative border-0 border-b-2 p-2 has-[input:focus]:outline-none has-[input:focus]:border-accent flex gap-1 has-[button:focus]:outline-none has-[button:focus]:border-accent ${className}`}
    >
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="peer"
        {...rest}
      />
      <button
        className="text-gray-700 focus:outline-none focus:text-accent cursor-pointer"
        onClick={togglePasswordVisibility}
        type="button"
      >
        {showPassword ? (
          <EyeCloseIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
