import { z } from "zod";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
} from "./AuthSchema";

/**
 * Esquema de validação para o formulário de registro.
 *
 * Este esquema utiliza a biblioteca Zod para validar os dados do formulário.
 * Ele garante que os campos de nome, e-mail, senha e confirmação de senha sejam válidos.
 *
 * @module RegisterSchema
 */
export const registerSchema = z
  .object({
    nome: nameSchema,
    email: emailSchema,
    senha: passwordSchema,
    confirmar_senha: confirmPasswordSchema,
  })
  .refine((data) => data.senha === data.confirmar_senha, {
    message: "As senhas não coincidem",
    path: ["confirmar_senha"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
