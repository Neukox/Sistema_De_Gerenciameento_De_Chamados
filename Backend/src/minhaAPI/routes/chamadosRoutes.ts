import express, { Router } from "express";
import Controller from "../controllers/chamados.controllers";
import {
  validateStatusQuery,
  validateTypeQuery,
} from "../middlewares/validateQuerys";
import { validateIdParam } from "../middlewares/validateParams";
import autenticate from "../middlewares/autenticate";
import verifyAdmin from "../middlewares/isAdmin";

const router: Router = express.Router();

// Rota para buscar todos os chamados
router.get(
  "/",
  [autenticate, verifyAdmin, validateTypeQuery, validateStatusQuery],
  Controller.getAll
);

// Rota para buscar chamados por ID
router.get("/:id", [autenticate, validateIdParam], Controller.getById);

// Rota para buscar chamados por usuário
router.get(
  "/usuario/:id",
  [autenticate, validateIdParam, validateTypeQuery, validateStatusQuery],
  Controller.getByUserId
);

// Rota para criar um novo chamado
router.post("/", autenticate, Controller.create);

// Rota para enviar um e-mail de mensagem para o usuário sobre um chamado
router.post(
  "/mensagem/:id",
  [autenticate, validateIdParam],
  Controller.sendMessage
);

// Rota para atualizar um chamado
router.put("/:id", [autenticate, validateIdParam], Controller.update);

// Rota para atualizar o status de um chamado
router.patch(
  "/status/:id",
  [autenticate, verifyAdmin, validateIdParam],
  Controller.updateStatus
);

// Rota para atualizar o status de um chamado para cancelado
router.patch(
  "/cancelar/:id",
  [autenticate, validateIdParam],
  Controller.cancel
);

export default router;
