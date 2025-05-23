/** 
 * @description Componente de carregamento.
 * 
 * Esse componente exibe um ícone de carregamento centralizado na tela.
 * Ele pode ser utilizado em diferentes partes da aplicação para indicar que
 * uma operação está em andamento.
 * 
 * @component
 * @param {string} [className] - Classe CSS opcional para estilização adicional.
 * @returns {JSX.Element} O componente de carregamento renderizado.
 */
export default function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <span className="loading loading-spinner text-accent w-20"></span>
    </div>
  );
}
