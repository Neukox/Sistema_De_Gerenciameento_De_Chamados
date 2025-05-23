import express from "express";
import userController from "../controllers/usuario.controllers";
import { registerUser } from "../controllers/register/register";
import { Login } from "../controllers/login/login";
import { forgotPassword } from "../controllers/forgotpassword/forgotPassword";
import { resetPassword } from "../controllers/resetpassword/resetPassword";
import jwt from "jsonwebtoken";
import { decodeToken, generateToken } from "../utils/JWT";
import { validateIdParam } from "../middlewares/validateParams";

const router = express.Router();

// Rota para atualizar informações do usuário
router.get("/user/:id", validateIdParam, userController.getUserInfo);

// Rota para registro de usuário
router.post("/register", async (req: any, res: any) => {
  console.log("📥 Corpo recebido no /register:", req.body);
  try {
    // registra o usuário
    const usuarioRegistrado = await registerUser(req.body);

    // gera o token
    const token = generateToken(usuarioRegistrado, "4h");

    res.status(201).json({
      mensagem: "Usuário registrado com sucesso!",
      session: decodeToken(token),
      token,
    });
  } catch (erro: any) {
    res.status(400).json({ erro: erro.message });
  }
});

router.post("/login", async (req: any, res: any) => {
  console.log("📥 Corpo recebido no /login:", req.body);

  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ mensagem: "Email e senha são obrigatórios." });
  }

  try {
    const usuario = await Login(email, password);

    if (!usuario) {
      console.log("Email ou senha incorretos.");
      return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    // Gera o token JWT
    const token = generateToken(usuario, "4h");

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      session: decodeToken(token),
      token,
    });
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
});

// Rota para redefinição de senha
router.post("/forgot-password", async (req: any, res: any) => {
  const { email } = req.body;

  if (typeof email !== "string") {
    return res.status(400).json({ mensagem: "Email é obrigatório." });
  }

  try {
    // Verifica se o usuário existe
    await forgotPassword(email);
    res
      .status(200)
      .json({ mensagem: "Email de redefinição de senha enviado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
});

// Rota para redefinir a senha
router.post("/reset-password", async (req: any, res: any) => {
  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não encontrado." });
  }

  if (typeof newPassword !== "string") {
    return res
      .status(400)
      .json({ mensagem: "Email e nova senha são obrigatórios." });
  }

  try {
    // Decodifica o token
    const decodedToken = decodeToken(token) as jwt.JwtPayload;
    const email = decodedToken.email;
    await resetPassword(email, newPassword);
    res.status(200).json({ mensagem: "Senha redefinida com sucesso!" });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ erro: "Token expirado, tente novamente" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ erro: "Token inválido, tente novamente" });
    }

    res.status(400).json({ erro: error.message });
  }
});

// Rota para atualizar informações do usuário
router.put("/user/:id", validateIdParam, userController.updateUserInfo);

// Rota para alterar a senha do usuário
router.patch(
  "/user/change-password/:id",
  validateIdParam,
  userController.changePassword
);

export default router;
