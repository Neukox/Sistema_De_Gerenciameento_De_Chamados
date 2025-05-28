import { Resposta } from "@prisma/client";

export interface RespostaWithDe extends Resposta {
  usuario?:{
    nome: string;
  }
}

export type RespostaCreate = Pick<
  Resposta,
  "chamado_id" | "usuario_id" | "mensagem"
>;
