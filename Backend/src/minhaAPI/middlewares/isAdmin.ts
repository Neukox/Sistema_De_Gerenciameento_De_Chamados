import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/JWT";

export default function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Token não fornecido",
    }); // Unauthorized
    return;
  }

  try {
    const decoded = decodeToken(token);

    if (decoded?.role !== "admin") {
      res.status(403).json({
        message: "Não autorizado a acessar esta requisição",
      }); // Forbidden
      return;
    }

    next();
  } catch (error) {
    res.status(403).json({
      message: "Token inválido",
    }); // Forbidden
  }
}
