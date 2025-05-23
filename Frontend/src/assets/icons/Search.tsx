/**
 * Componente funcional React que renderiza um ícone de pesquisa SVG.
 *
 * @component
 * @param {string} [props.className] - Classes CSS adicionais para estilização (opcional).
 * @returns {JSX.Element} O ícone de pesquisa renderizado.
 */
export default function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="currentColor"
    >
      <path d="M21 21l-4.35-4.35M16.65 10.65A6.65 6.65 0 1 1 10 4a6.65 6.65 0 0 1 6.65 6.65z"></path>
    </svg>
  );
}
