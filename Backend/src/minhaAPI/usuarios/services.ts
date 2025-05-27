import { PrismaClient, Usuario } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Função para buscar um usuário pelo email.
 * Retorna um objeto representando o usuário se encontrado, ou null se não existir.
 *
 * @returns Um objeto com os dados do usuário ou null se não encontrado.
 */
async function getByEmail(email: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  return usuario;
}

/**
 * Função para buscar um usuário pelo ID.
 * Retorna um objeto representando o usuário se encontrado, ou null se não existir.
 * @param id - ID do usuário a ser buscado.
 * @return Um objeto com os dados do usuário ou null se não encontrado.
 */

async function getById(id: number): Promise<Usuario | null> {
  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });

  return usuario;
}

async function getAllAdmins(): Promise<Usuario[]> {
  const admins = await prisma.usuario.findMany({
    where: { tipo: "admin" },
  });
  return admins;
}

/**
 * Função para buscar admin pelo ID.
 * Retorna um objeto representando o usuário se encontrado, ou null se não existir.
 * @param id - ID do usuário a ser buscado.
 * @return Um objeto com os dados do usuário ou null se não encontrado.
 */
async function getAdminById(id: number): Promise<Usuario | null> {
  const admin = await prisma.usuario.findUnique({
    where: { id, tipo: "admin" },
  });

  return admin;
}

export default { getByEmail, getById, getAdminById, getAllAdmins };
