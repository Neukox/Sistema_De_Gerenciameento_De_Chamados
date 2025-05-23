import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/JWT";

/**
 * Middleware para autenticação de token JWT.
 * Verifica se o token JWT fornecido no cabeçalho Authorization é válido.
 *
 * @function authenticateToken
 * @param {Request} req - Objeto de solicitação do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @param {NextFunction} next - Função de próxima etapa do middleware.
 * @returns {void}
 * @throws {Error} - Lança um erro se o token não for fornecido ou for inválido.
 * */

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1].trim();

  if (!token) {
    res.status(401).json({
      message: "Token não fornecido",
    }); // Unauthorized
    return;
  }

  try {
    const decoded = decodeToken(token);
    next();
  } catch (error) {
    res.status(403).json({
      message: "Token inválido",
    }); // Forbidden
  }
}
