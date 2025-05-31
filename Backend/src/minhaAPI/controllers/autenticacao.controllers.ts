import AuthService from "../autenticacao/services";
import UserService from "../usuarios/services";
import { Request, Response } from "express";
import { decodeToken, generateToken } from "../utils/JWT";
import { sendRecoverPasswordEmail } from "../email/send";
import { UserData } from "../autenticacao/models";
import jwt from "jsonwebtoken";

/**
 * Controlador para autenticação de usuários.
 * Contém métodos para login e registro de usuários, além de redefinição e recuperação de senha.
 * @module autenticacao.controllers
 */

/**
 * Função para realizar o login de um usuário.
 * Verifica as credenciais e retorna um token JWT se forem válidas.
 *
 * @return {Promise<void>} Retorna uma resposta JSON com uma mensagem de sucesso, informações da sessão e o token JWT.
 */
async function login(req: Request, res: Response): Promise<void> {
  const { email, senha } = req.body;

  // Verifica se o email e a senha foram fornecidos
  if (!email || !senha) {
    res.status(400).json({ message: "Email e senha são obrigatórios" });
    return;
  }

  try {
    const usuario = await AuthService.login(email, senha);

    // Verifica se o usuário foi encontrado
    if (!usuario) {
      res.status(401).json({ message: "email ou senha inválidos" });
      return;
    }

    // Gera o token JWT
    const token = generateToken(usuario, "4h");

    res.status(200).json({
      message: "Login bem-sucedido",
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Houve um erro ao fazer login" });
  }
}

/**
 * Função para registrar um novo usuário.
 * Cria um novo usuário no banco de dados com as informações fornecidas.
 *
 * @return Retorna uma resposta JSON com uma mensagem de sucesso, informações do usuário criado e o token JWT.
 */
async function register(req: Request, res: Response): Promise<void> {
  const { nome, email, senha } = req.body;

  // Verifica se os dados necessários foram fornecidos
  if (!nome || !email || !senha) {
    res.status(400).json({ message: "Dados são obrigatórios" });
    return;
  }

  try {
    const usuarioExistente = await UserService.getByEmail(email);

    // Verifica se já existe um usuário com o mesmo email
    if (usuarioExistente) {
      res.status(400).json({ message: "Email já cadastrado" });
      return;
    }

    const usuario = await AuthService.register(nome, email, senha);

    // Gera o token JWT
    const token = generateToken(usuario as UserData, "4h");

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: {
        id: usuario?.id,
        name: usuario?.name,
        email: usuario?.email,
        role: usuario?.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: "Houve um erro ao fazer cadastro" });
  }
}

/**
 * Função para solicitar a redefinição de senha.
 * Envia um email com um link para redefinir a senha do usuário.
 *
 * @returns {Promise<void>} Retorna uma resposta JSON com uma mensagem de sucesso ou erro.
 */

async function forgotPassword(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  // Verifica se o email foi fornecido
  if (!email) {
    res.status(400).json({ message: "Email é obrigatório" });
    return;
  }

  try {
    const forgotData = await AuthService.forgotPassword(email);

    if (!forgotData) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    sendRecoverPasswordEmail(email, {
      user_name: forgotData.user_name,
      url: forgotData.url,
    });

    res.status(200).json({
      message: "Email de redefinição de senha enviado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res
      .status(500)
      .json({ message: "Houve um erro ao solicitar redefinição de senha" });
  }
}

/**
 * Função para redefinir a senha do usuário.
 * Verifica o token de redefinição e atualiza a senha do usuário.
 *
 * @returns {Promise<void>} Retorna uma resposta JSON com uma mensagem de sucesso ou erro.
 * */

async function resetPassword(req: Request, res: Response): Promise<void> {
  const { nova_senha, token } = req.body;

  // Verifica se a nova senha e o token foram fornecidos
  if (!nova_senha) {
    res.status(400).json({ message: "Senha é obrigatória" });
    return;
  }

  // Verifica se o token foi fornecido
  if (!token) {
    res.status(400).json({ message: "Token não forneciodo" });
    return;
  }

  try {
    const decodedToken = decodeToken(token);

    await AuthService.resetPassword(decodedToken.email, nova_senha);

    res.status(200).json({
      message: "Senha redefinida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json({ message: "Token inválido ou expirado, tente novamente" });
      return;
    }

    res.status(500).json({ message: "Houve um erro ao redefinir senha" });
  }
}

/**
 * Função para verificar a validade de um token JWT.
 * Decodifica o token e retorna as informações do usuário se for válido.
 *
 * @returns {Promise<void>} Retorna uma resposta JSON com o status de validade do token e as informações do usuário.
 */

async function verify(req: Request, res: Response): Promise<void> {
  const { token } = req.body;

  // Verifica se o token foi fornecido
  if (!token) {
    res.status(400).json({ valid: false, message: "Token não fornecido" });
    return;
  }

  try {
    const decodedToken = decodeToken(token);
    res.status(200).json({
      valid: true,
      message: "Token validado com sucesso",
      user: decodedToken,
    });
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res
      .status(401)
      .json({ valid: false, message: "Token inválido ou expirado" });
  }
}

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  verify,
};
