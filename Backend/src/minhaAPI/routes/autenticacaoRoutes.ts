import express from "express";
import AuthController from "../controllers/autenticacao.controllers";

const router = express.Router();

// Rota para login de usuário
router.post("/login", AuthController.login);

// Rota para registro de usuário
router.post("/register", AuthController.register);

// Rota para redefinição de senha
router.post("/forgot-password", AuthController.forgotPassword);

// Rota para redefinição de senha com token
router.post("/reset-password", AuthController.resetPassword);

// Rota para verificar o token de usuário
router.post("/verify-token", AuthController.verify);

// Exporta o roteador de autenticação
export default router;
