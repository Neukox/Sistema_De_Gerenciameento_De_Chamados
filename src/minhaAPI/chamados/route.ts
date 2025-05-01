//Rotas HTTP da API (ex: GET /chamados)

// chamados/route.ts

import { Router } from "express";
import { listarChamados } from "../chamados/controller";

const router = Router();

router.get("/chamados", listarChamados);

export default router;
