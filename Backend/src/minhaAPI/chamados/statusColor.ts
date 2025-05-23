export enum StatusChamado {
  ABERTO = "aberto",
  EM_ANDAMENTO = "em_andamento",
  RESOLVIDO = "resolvido",
  FECHADO = "fechado"
}

export const corPorStatus: Record<StatusChamado, string> = {
  [StatusChamado.ABERTO]: "#007bff",         // Azul
  [StatusChamado.EM_ANDAMENTO]: "#fd7e14",   // Laranja
  [StatusChamado.RESOLVIDO]: "#28a745",      // Verde
  [StatusChamado.FECHADO]: "#6c757d"         // Cinza
}

export function getCorPorStatus(status: string): string {
  return corPorStatus[status as StatusChamado] || "#000000" // Preto se inválido
}