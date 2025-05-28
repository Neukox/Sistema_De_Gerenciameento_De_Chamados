import { Usuario } from "@prisma/client";

export type UsuarioUpdate = Pick<Usuario, "nome" | "email">;
