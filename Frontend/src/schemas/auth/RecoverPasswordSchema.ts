import { z } from "zod";
import { emailSchema } from "./AuthSchema";

/**
 * Esquema de validação para o formulário de recuperação de senha.
 *
 * Este esquema utiliza a biblioteca Zod para validar os dados do formulário.
 * Ele garante que o campo de e-mail seja um endereço de e-mail válido.
 *
 * @module RecoverPasswordSchema
 */
export const recoverPasswordSchema = z.object({
  email: emailSchema,
});

export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>;
