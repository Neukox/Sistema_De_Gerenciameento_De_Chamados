import { z } from "zod";
import {
  descriptionSchema,
  titleSchema,
  typeServiceSchema,
} from "./TicketSchema";

/**
 * Validação de esquema para o formulário de criação de chamado.
 * Utiliza a biblioteca Zod para definir os esquemas de validação.
 */

export const createTicketSchema = z.object({
  tipo_atendimento: typeServiceSchema,
  titulo: titleSchema,
  descricao: descriptionSchema,
});

export type CreateTicketData = z.infer<typeof createTicketSchema>;
