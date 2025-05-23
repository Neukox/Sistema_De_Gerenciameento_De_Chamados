/**
 * @description Componente CloseIcon
 *
 * Esse componente é um ícone SVG que representa um botão de fechar.
 * Ele é utilizado em diversos lugares da aplicação, como em modais, pop-ups e menus.
 *
 * @param {className} - Classe CSS opcional para estilização do ícone.
 * @returns {JSX.Element} - O ícone SVG do botão de fechar.
 */

export default function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
      ></path>
    </svg>
  );
}
