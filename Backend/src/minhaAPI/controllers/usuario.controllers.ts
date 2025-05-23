import { Request, Response } from "express";
import {
  alterarSenha,
  atualizarInformacoesUsuario,
  buscarUsuarioPorId,
} from "../bancodedados/usuarioRepo";
import bycrypt from "bcrypt";

async function getUserInfo(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      res.status(404).json({
        message: "Usuário não encontrado",
      });
      return;
    }

    res.status(200).json({
      id: usuario.id,
      name: usuario.nome,
      email: usuario.email,
      role: usuario.tipo,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Erro ao buscar informações do usuário",
    });
    console.error("Erro ao buscar informações do usuário:", error);
  }
}

async function updateUserInfo(req: Request, res: Response): Promise<void> {
  const { nome, email } = req.body;
  const id = Number(req.params.id);

  if (!nome || !email) {
    res.status(400).json({
      message: "Dados inválidos",
    });
    return;
  }

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      res.status(404).json({
        message: "Usuário não encontrado",
      });
      return;
    }

    await atualizarInformacoesUsuario(id, nome, email);

    res.status(200).json({
      message: "Informações atualizadas com sucesso",
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Erro ao atualizar informações do usuário",
    });
    console.error("Erro ao atualizar informações do usuário:", error);
  }
}

async function changePassword(req: Request, res: Response): Promise<void> {
  const { novaSenha } = req.body;
  const id = Number(req.params.id);

  if (!novaSenha) {
    res.status(400).json({
      message: "Dados inválidos",
    });
    return;
  }

  try {
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      res.status(404).json({
        message: "Usuário não encontrado",
      });
      return;
    }

    const hashedPassword = await bycrypt.hash(novaSenha, 10);

    await alterarSenha(id, hashedPassword);

    res.status(200).json({
      message: "Senha alterada com sucesso",
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Erro ao alterar senha do usuário",
    });
    console.error("Erro ao alterar senha do usuário:", error);
  }
}

export default {
  getUserInfo,
  updateUserInfo,
  changePassword,
};
