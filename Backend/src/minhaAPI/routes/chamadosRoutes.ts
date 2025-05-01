import express, { Router } from "express";
import Controller from "../controllers/chamados.controllers";
import {
  validateStatusQuery,
  validateTypeQuery,
} from "../middlewares/validateQuerys";
import { validateIdParam } from "../middlewares/validateParams";

const router: Router = express.Router();

// Rota para buscar todos os chamados
router.get("/", [validateTypeQuery, validateStatusQuery], Controller.getAll);

// Rota para buscar chamados por ID
router.get("/:id", validateIdParam, Controller.getById);

// Rota para buscar chamados por usuário
router.get(
  "/usuario/:id",
  [validateIdParam, validateTypeQuery, validateStatusQuery],
  Controller.getByUserId
);

// Rota para criar um novo chamado
router.post("/", Controller.create);

// Rota para atualizar um chamado
router.put("/:id", validateIdParam, Controller.update);

// Rota para atualizar o status de um chamado
router.patch("/status/:id", validateIdParam, Controller.updateStatus);

// Rota para atualizar o status de um chamado para cancelado
router.patch("/cancelar/:id", validateIdParam, Controller.cancel);

export default router;
