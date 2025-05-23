import connectDB from "./bancoDeDados";

export interface Mensagen {
  usuario_id: number;
  de: string;
  mensagem: string;
  data_envio: string;
}

/**
 * Salva uma mensagem no banco de dados
 * @async
 * @param {string} chamadoId - ID do chamado
 * @param {string} userId - ID do usuário
 * @param {string} conteudo - Conteúdo da mensagem
 * @returns {Promise<void>}
 */
export const salvarMensagem = async (
  chamadoId: string,
  userId: string,
  conteudo: string
): Promise<void> => {
  const db = await connectDB();
  try {
    await db.run(
      "INSERT INTO respostas (chamado_id, usuario_id, mensagem) VALUES (?, ?, ?)",
      [chamadoId, userId, conteudo]
    );
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
  } finally {
    await db.close();
  }
};

/**
 * Busca mensagens do chat de um chamado específico
 * @async
 * @param {string} chamadoId - ID do chamado
 * @return {Promise<Array>} - Lista de mensagens
 */
export const buscarMensagensPorChamadoId = async (
  chamadoId: string
): Promise<Mensagen[] | undefined> => {
  const db = await connectDB();
  try {
    const mensagens = await db.all<Mensagen[]>(
      "SELECT r.usuario_id, r.mensagem, r.data_envio, u.nome as de FROM respostas r JOIN usuarios u ON r.usuario_id = u.id WHERE r.chamado_id = ? ORDER BY r.data_envio ASC",
      [chamadoId]
    );

    return mensagens;
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
  } finally {
    await db.close();
  }
};

/**
 * Busca a mensagem mais recente de um chamado
 * @async
 *
 * @param {string} chamadoId - ID do chamado
 * @return {Promise<Mensagen | undefined>} - Mensagem mais recente
 */
export const buscarUltimaMensagemPorChamadoId = async (
  chamadoId: string
): Promise<Mensagen | undefined> => {
  const db = await connectDB();
  try {
    const mensagem = await db.get<Mensagen>(
      "SELECT r.mensagem, r.data_envio, u.nome as de FROM respostas r JOIN usuarios u ON r.usuario_id = u.id WHERE r.chamado_id = ? ORDER BY r.data_envio DESC LIMIT 1",
      [chamadoId]
    );

    return mensagem;
  } catch (error) {
    console.error("Erro ao buscar última mensagem:", error);
  } finally {
    await db.close();
  }
};
