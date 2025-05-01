import { Request, Response, NextFunction } from "express";

/**
 * Middleware para validar o parâmetro ID na rota.
 * Verifica se o ID fornecido é um número válido.
 *
 * @function validateIdParam
 * @param {Request} req - Objeto de solicitação do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @param {NextFunction} next - Função de próxima etapa do middleware.
 * @returns {void}
 * @throws {Error} - Lança um erro se o ID não for fornecido ou não for um número válido.
 */

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    res.status(400).json({ message: "ID não fornecido" });
    return;
  }

  next();
}
