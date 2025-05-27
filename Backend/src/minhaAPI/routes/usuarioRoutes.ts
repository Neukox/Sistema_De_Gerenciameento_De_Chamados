import express from "express";
import userController from "../controllers/usuario.controllers";
import { validateIdParam } from "../middlewares/validateParams";

const router = express.Router();

// Rota para atualizar informações do usuário
router.get("/:id", validateIdParam, userController.getUserInfo);

// Rota para atualizar informações do usuário
router.put("/:id", validateIdParam, userController.updateUserInfo);

// Rota para alterar a senha do usuário
router.patch(
  "/change-password/:id",
  validateIdParam,
  userController.changePassword
);

export default router;
