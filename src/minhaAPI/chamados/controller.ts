//Funções que tratam as requisições HTTP

// chamados/controller.ts

import { Request, Response } from "express";
import { getChamados } from "./service";
import { getCorPorStatus } from "./statusColor";

export async function listarChamados(req: Request, res: Response) {
  try {
    const chamados = await getChamados();

    // Adiciona a cor ao status antes de retornar
    const chamadosComCor = chamados.map(chamado => ({
      ...chamado,
      corStatus: getCorPorStatus(chamado.status)
    }));

    res.json(chamadosComCor);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar chamados" });
  }
}


