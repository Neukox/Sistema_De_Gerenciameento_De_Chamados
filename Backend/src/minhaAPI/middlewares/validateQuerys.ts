import { NextFunction, Request, Response } from "express";

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
