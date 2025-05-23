import { z } from "zod";
import { descriptionSchema, titleSchema } from "./TicketSchema";

/**
 * Validação de esquema para o formulário de edição de chamado.
 * Utiliza a biblioteca Zod para definir os esquemas de validação.
 */

export const editTicketSchema = z.object({
  titulo: titleSchema,
  descricao: descriptionSchema,
});

export type EditTicketData = z.infer<typeof editTicketSchema>;
