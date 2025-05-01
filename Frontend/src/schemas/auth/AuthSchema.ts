import { z } from "zod";

/* 
    Validação de esquema para os formulário de autenticação.
    Utiliza a biblioteca Zod para definir os esquemas de validação.
*/

export const nameSchema = z.string().nonempty("O nome é obrigatório");

export const emailSchema = z.string().email("E-mail inválido");

export const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mímino 8 caracteres");

export const confirmPasswordSchema = z.string();
