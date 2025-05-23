import { NextFunction, Request, Response } from "express";

/**
 * Middleware para validar o parâmetro de consulta "type".
 * Verifica se o tipo de chamado fornecido é válido.
 *
 * @function validateTypeQuery
 * @param {Request} req - Objeto de solicitação do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @param {NextFunction} next - Função de próxima etapa do middleware.
 * @returns {void}
 * @throws {Error} - Lança um erro se o tipo não for fornecido ou não for válido.
 */

export function validateTypeQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { type } = req.query;

  if (!type) return next();

  if (!["email", "chat"].includes(type as string)) {
    res.status(400).json({ message: "Tipo de chamado inválido" });
    console.log("Tipo de chamado inválido");
    return;
  }

  console.log("Tipo de chamado válido");

  next();
}

/**
 * Middleware para validar o parâmetro de consulta "status".
 * Verifica se o status de chamado fornecido é válido.
 *
 * @function validateStatusQuery
 * @param {Request} req - Objeto de solicitação do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @param {NextFunction} next - Função de próxima etapa do middleware.
 * @returns {void}
 * @throws {Error} - Lança um erro se o status não for fornecido ou não for válido.
 */

export function validateStatusQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { status } = req.query;

  if (!status) return next();

  if (
    ![
      "aberto",
      "em andamento",
      "pendente",
      "resolvido",
      "fechado",
      "cancelado",
    ].includes(status as string)
  ) {
    res.status(400).json({ message: "Status de chamado inválido" });
    return;
  }

  next();
}
