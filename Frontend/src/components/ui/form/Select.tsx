import ChevronDownIcon from "@assets/icons/ChevronDown";
import React from "react";

type SelectProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Um componente de seleção personalizado.
 * Permite selecionar uma opção de uma lista suspensa.
 *
 * @param {SelectProps} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Opções a serem exibidas no seletor.
 * @param {string} [props.className] - Classe CSS adicional para estilização.
 * @param {boolean} [props.disabled] - Indica se o seletor está desativado.
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} rest - Outras propriedades do seletor.
 * @returns {JSX.Element} Componente de seleção personalizado.
 */
export default function Select({
  disabled,
  children,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className={`${className} relative text-sm`}>
      <select
        className="appearance-none p-2 w-full h-full bg-base-100 dark:bg-base-200 rounded-none peer border-b-2 border-b-secondary hover:border-accent focus:outline-none focus:border-accent"
        disabled={disabled}
        {...rest}
      >
        {children}
      </select>
      <ChevronDownIcon
        className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary w-6 transition-all duration-200 ease-in-out peer-focus:text-accent peer-hover:text-accent peer-disabled:text-neutral"
        aria-hidden="true"
      />
    </div>
  );
}
