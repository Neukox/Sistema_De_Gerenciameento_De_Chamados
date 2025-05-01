/**
 * @description Componente de ícone de menu hamburguer.
 *
 * Esse componente renderiza um ícone de menu hamburguer em SVG.
 * Ele é comumente usado em interfaces de usuário para indicar um menu colapsável.
 *
 * @param {string} [className] - Classes CSS adicionais para estilização do ícone.
 * @returns {JSX.Element} O componente de ícone de menu hamburguer renderizado.
 * */

export default function HamburguerMenuIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 3.75A.75.75 0 0 1 .75 3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 3.75M0 8a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8m.75 3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
