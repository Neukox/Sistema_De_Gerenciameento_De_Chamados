import { z } from "zod";
import {
  passwordSchema,
  confirmPasswordSchema,
} from "./AuthSchema";

/**
 * Esquema de validação para o formulário de redefinição de senha.
 *
 * Este esquema utiliza a biblioteca Zod para validar os dados do formulário.
 * Ele garante que os campos de e-mail, nova senha e confirmação de senha sejam válidos.
 *
 * @module ResetPasswordSchema
 */
export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmNewPassword: confirmPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
