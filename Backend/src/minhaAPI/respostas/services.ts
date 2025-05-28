import { Resposta } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { RespostaCreate, RespostaWithDe } from "./models";

const prisma = new PrismaClient();

/**
 * Cria uma nova resposta no banco de dados.
 * @param data - Dados da resposta a ser criada.
 * @param data.chamado_id - ID do chamado associado à resposta.
 * @param data.usuario_id - ID do usuário que está enviando a resposta.
 * @param data.mensagem - Mensagem da resposta.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando a resposta é criada com sucesso.
 */
async function save(data: RespostaCreate): Promise<void> {
  await prisma.resposta.create({
    data: {
      chamado_id: data.chamado_id,
      usuario_id: data.usuario_id,
      mensagem: data.mensagem,
    },
  });
}

/**
 * Busca todas as respostas associadas a um chamado específico.
 * @param chamadoId - ID do chamado cujas respostas serão buscadas.
 * @returns {Promise<Resposta[]>} - Retorna uma Promise que resolve com um array de respostas.
 */

async function getAllByChamadoId(chamadoId: number): Promise<RespostaWithDe[]> {
  const respostas = await prisma.resposta.findMany({
    where: {
      chamado_id: chamadoId,
    },
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
    orderBy: {
      data_envio: "asc",
    },
  });

  return respostas;
}

/**
 * Busca a ultima resposta salva associada a um chamado específico.
 * @param id - ID da resposta a ser buscada.
 * @returns {Promise<Resposta | null>} - Retorna uma Promise que resolve com a resposta encontrada ou null se não existir.
 */
async function lastByChamadoId(
  chamadoId: number
): Promise<RespostaWithDe | null> {
  const resposta = await prisma.resposta.findFirst({
    where: {
      chamado_id: chamadoId,
    },
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
    orderBy: {
      data_envio: "desc",
    },
  });

  return resposta;
}

export default {
  save,
  getAllByChamadoId,
  lastByChamadoId,
};
