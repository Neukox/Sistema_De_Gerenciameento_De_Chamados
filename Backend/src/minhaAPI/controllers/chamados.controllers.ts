import { Request, Response } from "express";
import {
  atualizarChamado,
  atualizarStatusChamado,
  buscarChamados,
  buscarChamadosPorId,
  buscarChamadosPorUsuarioId,
  cancelarChamado,
  inserirChamado,
} from "../bancodedados/chamadoRepo";
import formatDate from "../utils/dateConverter";

const getAll = async (req: Request, res: Response): Promise<void> => {
  const { type, status } = req.query;

  try {
    const chamados = await buscarChamados(type as string, status as string);

    if (!chamados || chamados.length === 0) {
      res.status(404).json({ message: "Nenhum chamado encontrado" });
      return;
    }

    res.status(200).json({
      chamados: chamados.map((chamado) => ({
        id: chamado.id,
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        status: chamado.status,
        usuario_id: chamado.usuario_id,
        tipo_atendimento: chamado.tipo_atendimento,
        usuario_nome: chamado.usuarioNome,
        data_criacao: formatDate(chamado.criado_em),
        data_encerramento: formatDate(chamado.encerrado_em),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar chamados" });
    console.error("Erro ao buscar chamados:", error);
  }
};

async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  try {
    const chamado = await buscarChamadosPorId(id);

    if (!chamado) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    res.status(200).json({
      id: chamado.id,
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      status: chamado.status,
      usuario_id: chamado.usuario_id,
      usuario_nome: chamado.usuarioNome,
      tipo_atendimento: chamado.tipo_atendimento,
      data_criacao: formatDate(chamado.criado_em),
      data_encerramento: formatDate(chamado.encerrado_em),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar chamado" });
    console.error("Erro ao buscar chamado:", error);
  }
}

async function getByUserId(req: Request, res: Response): Promise<void> {
  const usuarioId = Number(req.params.id);
  const { type, status } = req.query;

  try {
    const chamados = await buscarChamadosPorUsuarioId(
      usuarioId,
      type as string,
      status as string
    );

    if (!chamados || chamados.length === 0) {
      res.status(404).json({ message: "Nenhum chamado encontrado" });
      return;
    }

    res.status(200).json({
      chamados: chamados.map((chamado) => ({
        id: chamado.id,
        titulo: chamado.titulo,
        descricao: chamado.descricao,
        status: chamado.status,
        usuario_id: chamado.usuario_id,
        tipo_atendimento: chamado.tipo_atendimento,
        data_criacao: formatDate(chamado.criado_em),
        data_encerramento: formatDate(chamado.encerrado_em),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar chamados" });
    console.error("Erro ao buscar chamados:", error);
  }
}

async function create(req: Request, res: Response): Promise<void> {
  const {
    titulo,
    descricao,
    usuario_id: usuarioId,
    tipo_atendimento: tipoAtendimento,
  } = req.body;

  if (!titulo || !descricao || !usuarioId || !tipoAtendimento) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  try {
    await inserirChamado(titulo, descricao, usuarioId, tipoAtendimento);

    res.status(201).json({ message: "Chamado criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar chamado" });
    console.error("Erro ao criar chamado:", error);
  }
}

async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    res.status(400).json({ message: "Dados inválidos" });
    return;
  }

  try {
    const chamado = await buscarChamadosPorId(id);

    if (!chamado) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    await atualizarChamado(id, titulo, descricao);

    res.status(200).json({ message: "Chamado atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar chamado" });
    console.error("Erro ao atualizar chamado:", error);
  }
}

async function updateStatus(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (
    !status ||
    ![
      "aberto",
      "em andamento",
      "pendente",
      "resolvido",
      "fechado",
      "cancelado",
    ].includes(status as string)
  ) {
    res.status(400).json({ message: "Status inválido" });
    return;
  }

  try {
    const chamado = await buscarChamadosPorId(id);

    if (!chamado) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    if (["fechado", "cancelado"].includes(chamado.status as string)) {
      res.status(400).json({ message: "Chamado já encerrado ou cancelado" });
      return;
    }

    await atualizarStatusChamado(id, status);

    res
      .status(200)
      .json({ message: "Status de chamado atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar chamado" });
    console.error("Erro ao atualizar chamado:", error);
  }
}

async function cancel(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  try {
    const chamado = await buscarChamadosPorId(id);

    if (!chamado) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    if (["fechado", "cancelado"].includes(chamado.status as string)) {
      res.status(400).json({ message: "Chamado já encerrado ou cancelado" });
      return;
    }

    await cancelarChamado(id);

    res.status(200).json({ message: "Chamado cancelado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cancelar chamado" });
    console.error("Erro ao cancelar chamado:", error);
  }
}

export default {
  getAll,
  getById,
  getByUserId,
  create,
  update,
  updateStatus,
  cancel,
};
