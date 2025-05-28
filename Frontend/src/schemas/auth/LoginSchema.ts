import { z } from "zod";
import { emailSchema, passwordSchema } from "./AuthSchema";

/**
 * Validação de esquema para o formulário de login.
 * Utiliza a biblioteca Zod para definir os esquemas de validação.
 *
 * @module LoginSchema
 */
export const loginSchema = z.object({
  email: emailSchema,
  senha: passwordSchema,
});

export type LoginData = z.infer<typeof loginSchema>;
