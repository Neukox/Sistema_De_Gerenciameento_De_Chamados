/**
 * @description Componente de ícone de Olho.
 *
 * Esse componente renderiza um ícone de olho em SVG. Este ícone pode ser usado para indicar a funcionalidade de mostrar ou ocultar informações, como senhas ou detalhes sensíveis.
 *
 * @component
 * @param {string} [className] - Classes CSS adicionais para estilização do ícone.
 *
 * @returns {JSX.Element} O componente de ícone de Olho renderizado.
 * */
export default function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M2.899 12.735a1.87 1.87 0 0 1 0-1.47c.808-1.92 2.1-3.535 3.716-4.647S10.103 4.945 12 5.004c1.897-.059 3.768.502 5.385 1.614s2.908 2.727 3.716 4.647a1.87 1.87 0 0 1 0 1.47c-.808 1.92-2.1 3.535-3.716 4.647S13.897 19.055 12 18.996c-1.897.059-3.768-.502-5.385-1.614S3.707 14.655 2.9 12.735"></path>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7"></path>
      </g>
    </svg>
  );
}
