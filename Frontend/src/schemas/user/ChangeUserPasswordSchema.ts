import { z } from "zod";
import { passwordSchema, confirmPasswordSchema } from "../auth/AuthSchema";

/**
 * Esquema de validação para o formulário de alteração de senha do usuário.
 *
 * Este esquema utiliza a biblioteca Zod para validar os dados do formulário.
 * Ele garante que os campos de senha e confirmação de senha sejam válidos.
 *
 */
export const changeUserPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ChangeUserPasswordData = z.infer<typeof changeUserPasswordSchema>;
