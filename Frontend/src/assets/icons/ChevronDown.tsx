/**
 * @file ChevronDown.tsx
 *
 * Componente ChevronDownIcon
 * Este componente é um ícone SVG que representa uma seta para baixo.
 * 
 * @param {className} - Classe CSS opcional para estilização do ícone.
 * @returns {JSX.Element} - O ícone SVG da seta para baixo.
 */

export default function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06 0L10 10.44l3.71-3.23a.75.75 0 1 1 .94 1.12l-4.25 3.6a.75.75 0 0 1-.94 0l-4.25-3.6a.75.75 0 0 1 0-1.12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
