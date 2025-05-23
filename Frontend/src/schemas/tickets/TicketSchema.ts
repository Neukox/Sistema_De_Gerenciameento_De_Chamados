import { z } from "zod";

/* 
    Validação de esquema para os formulário de criação/edição de chamados.
    Utiliza a biblioteca Zod para definir os esquemas de validação.
*/

export const typeServiceSchema = z.enum(["email", "chat"], {
  message: "Selecione uma opção de atendimento",
});

export const titleSchema = z.string().nonempty("O título é obrigatório");

export const descriptionSchema = z
  .string()
  .nonempty("A descrição é obrigatória");
