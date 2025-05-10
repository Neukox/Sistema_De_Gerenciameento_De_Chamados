import SearchIcon from "@assets/icons/Search";

type SearchProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Search({ className, ...rest }: SearchProps) {
  return (
    <div
      className={`input input-secondary rounded-none relative border-0 border-b-2 p-2 has-[input:focus]:outline-none has-[input:focus]:border-accent has-[input:focus]:bg-base-300 flex gap-4 ${className}`}
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
        className="absolute top-2 right-2 text-primary peer-focus:hidden peer-hover:hidden"
      >
        <SearchIcon className="w-5 h-5" />
      </label>
    </div>
  );
}
