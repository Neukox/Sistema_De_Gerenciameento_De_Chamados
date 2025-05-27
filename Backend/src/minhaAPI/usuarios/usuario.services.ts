import { PrismaClient } from "@prisma/client";

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

export default { getByEmail };
