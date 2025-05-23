import { z } from "zod";
import { emailSchema, nameSchema } from "../auth/AuthSchema";

/**
 * Esquema de validação para o formulário de edição de informações do usuário.
 *
 * Este esquema utiliza a biblioteca Zod para validar os dados do formulário.
 * Ele garante que os campos de nome, e-mail e senha sejam válidos.
 *
 */
export const editUserInfoSchema = z.object({
  nome: nameSchema,
  email: emailSchema,
});

export type EditUserInfoData = z.infer<typeof editUserInfoSchema>;
