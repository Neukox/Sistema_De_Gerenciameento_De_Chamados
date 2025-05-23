// chamados/service.ts

// chamados/service.ts
import connectDB from "../bancodedados/bancoDeDados"; // Ajuste o caminho conforme sua estrutura

export async function getChamados() {
  const db = await connectDB(); // Conecta ao banco
  const chamados = await db.all("SELECT * FROM chamados"); // Pega todos os chamados
  return chamados;
}
