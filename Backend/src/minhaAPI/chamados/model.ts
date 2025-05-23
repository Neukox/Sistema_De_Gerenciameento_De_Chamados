//Definição da entidade (interface ou ORM)

export interface Chamado {
    id: number;
  titulo: string;
  descricao: string;
  status: string;
  corStatus?: string; // gerada dinamicamente
}