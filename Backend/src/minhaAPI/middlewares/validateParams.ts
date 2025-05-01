import { Request, Response, NextFunction } from "express";

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
