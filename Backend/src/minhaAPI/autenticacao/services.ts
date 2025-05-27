import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ForgotPasswordData, UserData } from "./models";
import UserService from "../usuarios/usuario.services";
import { generateToken } from "../utils/JWT";
import { gerarParDeChaves } from "../criptografia/criptografiaE2EE";

// Usando o Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient();

/**
 * Função para realizar o login de um usuário.
 * verifica as credenciais e retorna os dados do usuário se forem válidas.
 *
 * @param email - Email do usuário.
 * @param password - Senha do usuário.
 * @returns Um objeto com os dados do usuário ou null se as credenciais forem inválidas.
 */

async function login(
  email: string,
  password: string
): Promise<UserData | null> {
  // Verifica se o usuário existe
  const usuario = await UserService.getByEmail(email);

  // Se o usuário não existir, retorna null
  if (!usuario) {
    return null;
  }

  // Verifica a senha
  const senhaValida = await bcrypt.compare(password, usuario.senha);

  // Se a senha não for válida, retorna null
  if (!senhaValida) {
    return null;
  }

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
    role: usuario.tipo,
  };
}

/**
 * Função para registrar um novo usuário.
 * Cria um novo usuário no banco de dados com as informações fornecidas.
 *
 * @param nome - Nome do usuário.
 * @param email - Email do usuário.
 * @param senha - Senha do usuário.
 * @returns Um objeto com os dados do usuário criado ou null se o registro falhar.
 */

async function register(
  nome: string,
  email: string,
  senha: string
): Promise<UserData | null> {
  // Gera um par de chaves para criptografia
  const { privateKey, publicKey } = gerarParDeChaves();

  // Cria um novo usuário
  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: await bcrypt.hash(senha, 10), // Hash da senha
      private_key: privateKey, // Chave privada para criptografia
      public_key: publicKey, // Chave pública para criptografia
    },
  });

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
    role: usuario.tipo,
  };
}

async function forgotPassword(
  email: string
): Promise<ForgotPasswordData | null> {
  // Busca o usuário pelo email
  const usuario = await UserService.getByEmail(email);

  if (!usuario) {
    return null; // Usuário não encontrado
  }

  // Gera um token de redefinição de senha
  const token = generateToken({ email }, "15m");
  // URL para redefinição de senha
  const url = `${process.env.CLIENT_URL}/redefinir-senha?token=${token}`;

  // Retorna os dados necessários para enviar o email de redefinição de senha
  return {
    user_name: usuario.nome,
    url,
  };
}

/**
 * Função para redefinir a senha de um usuário.
 * Atualiza a senha do usuário no banco de dados.
 *
 * @param email - Email do usuário.
 * @param newPassword - Nova senha do usuário.
 * @returns void
 */

async function resetPassword(
  email: string,
  newPassword: string
): Promise<void> {
  // Busca o usuário pelo email
  const usuario = await UserService.getByEmail(email);

  // Se o usuário não existir, lança um erro
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  // Atualiza a senha do usuário
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { senha: await bcrypt.hash(newPassword, 10) },
  });
}

export default { login, register, forgotPassword, resetPassword };
