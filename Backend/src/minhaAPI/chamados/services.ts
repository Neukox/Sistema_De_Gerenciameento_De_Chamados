import { Chamado, PrismaClient } from "@prisma/client";
import {
  ChamadoCompleto,
  ChamadoCreate,
  ChamadoFiltros,
  ChamadoUpdate,
} from "./models";

// Importando o Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient();

/**
 * Função para buscar todos os chamados com base nos filtros fornecidos.
 * @param {ChamadoFiltros} filtros - Filtros opcionais para buscar chamados específicos.
 * @param {string} filtros.type - Tipo de atendimento (opcional).
 * @param {string} filtros.search - Termo de busca no título (opcional).
 * @param {string} filtros.status - Status do chamado (opcional).
 * @returns Uma lista de chamados que correspondem aos filtros aplicados.
 * */
async function getAll(filtros: ChamadoFiltros): Promise<Chamado[]> {
  const where: any = {};

  // Desestruturando os filtros para obter os parâmetros de busca
  const { type, search, status } = filtros;

  // Verifica se o tipo de atendimento foi fornecido e aplica a condição de busca
  if (type) {
    where.tipo_atendimento = type;
  }

  // Verifica se o termo de busca foi fornecido e aplica a condição de busca no título
  if (search) {
    where.titulo = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Verifica se o status foi fornecido e aplica a condição de busca
  if (status) {
    where.status = status;
  }

  return prisma.chamado.findMany({
    where,
  });
}

/**
 * Função para buscar um chamado específico pelo ID.
 * @param id - ID do chamado a ser buscado.
 * @returns O chamado correspondente ao ID fornecido.
 * */
async function getById(id: number): Promise<ChamadoCompleto | null> {
  return prisma.chamado.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
  });
}

/**
 * Função para buscar todos os chamados de um usuário específico.
 *
 * @param userId - ID do usuário cujos chamados serão buscados.
 * @param {ChamadoFiltros} filtros - Filtros opcionais para buscar chamados específicos do usuário.
 * @param {string} filtros.type - Tipo de atendimento (opcional).
 * @param {string} filtros.search - Termo de busca no título (opcional).
 * @param {string} filtros.status - Status do chamado (opcional).
 * @returns Uma lista de chamados do usuário que correspondem aos filtros aplicados.
 * */
async function getAllByUserId(
  userId: number,
  filtros: ChamadoFiltros
): Promise<Chamado[]> {
  const where: any = {
    usuario_id: userId,
  };

  // Desestruturando os filtros para obter os parâmetros de busca
  const { type, search, status } = filtros;

  // Verifica se o tipo de atendimento foi fornecido e aplica a condição de busca
  if (type) {
    where.tipo_atendimento = type;
  }

  // Verifica se o termo de busca foi fornecido e aplica a condição de busca no título
  if (search) {
    where.titulo = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Verifica se o status foi fornecido e aplica a condição de busca
  if (status) {
    where.status = status;
  }

  return prisma.chamado.findMany({
    where,
  });
}

/**
 * Função para criar um novo chamado.
 * @param chamado - Objeto contendo os dados do chamado a ser criado.
 * @returns O chamado recém-criado.
 * */
async function create(chamado: ChamadoCreate): Promise<Chamado> {
  return prisma.chamado.create({
    data: chamado,
  });
}

/**
 * Função para atualizar um chamado existente.
 * @param id - ID do chamado a ser atualizado.
 * @param {ChamadoUpdate} chamado - Objeto contendo os dados atualizados do chamado.
 * @param {string} chamado.titulo - Título do chamado (opcional).
 * @param {string} chamado.descricao - Descrição do chamado (opcional).
 * */
async function update(id: number, chamado: ChamadoUpdate): Promise<void> {
  await prisma.chamado.update({
    where: { id },
    data: chamado,
  });
}

/**
 * Função para atualizar o status de um chamado.
 * @param id - ID do chamado a ter o seu status atualizado.
 * */
async function updateStatus(id: number, status: string): Promise<void> {
  await prisma.chamado.update({
    where: { id },
    data: { status },
  });
}

/**
 * Função para cancelar um chamado pelo ID.
 * @param id - ID do chamado a ser cancelado.
 * */
async function cancel(id: number): Promise<void> {
  await prisma.chamado.update({
    where: { id },
    data: {
      status: "cancelado",
      encerrado_em: new Date(),
    },
  });
}

export default {
  getAll,
  getById,
  getAllByUserId,
  create,
  update,
  updateStatus,
  cancel,
};
