import SearchIcon from "@assets/icons/Search";

type SearchProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Um componente de pesquisa personalizado.
 * Permite fazer buscas em um campo de entrada estilizado.
 *
 * @param {SearchProps} props - Propriedades do componente.
 * @param {string} [props.className] - Classe CSS adicional para estilização.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - Outras propriedades do campo de entrada.
 * @returns {JSX.Element} Componente de pesquisa personalizado.
 */
export default function Search({ className, ...rest }: SearchProps) {
  return (
    <div
      className={`input input-secondary rounded-none relative border-0 border-b-2 p-2 has-[input:focus]:outline-none has-[input:focus]:border-accent flex gap-4 ${className}`}
    >
      <input
        id="search"
        type="search"
        name="search"
        placeholder="Pesquisar chamado"
        className="h-5 peer"
        {...rest}
      />
      <label
        htmlFor="search"
        className="absolute top-2 right-2 text-primary peer-focus:hidden"
      >
        <SearchIcon className="w-5 h-5" />
      </label>
    </div>
  );
}
