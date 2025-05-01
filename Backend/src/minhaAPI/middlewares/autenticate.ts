import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/JWT";

export default function authenticateToken(
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
    next();
  } catch (error) {
    res.status(403).json({
      message: "Token inválido",
    }); // Forbidden
  }
}
