import express from "express";
import userController from "../controllers/usuario.controllers";
import { validateIdParam } from "../middlewares/validateParams";
import authenticateToken from "../middlewares/autenticate";

const router = express.Router();

// Rota para atualizar informações do usuário
router.get(
  "/:id",
  [authenticateToken, validateIdParam],
  userController.getUserInfo
);

// Rota para atualizar informações do usuário
router.put(
  "/:id",
  [authenticateToken, validateIdParam],
  userController.updateUserInfo
);

// Rota para alterar a senha do usuário
router.patch(
  "/change-password/:id",
  [authenticateToken, validateIdParam],
  userController.changePassword
);

export default router;
