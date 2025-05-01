import connectDB from "./bancoDeDados";

export interface ChamadoDB {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  usuario_id: number;
  criado_em: string;
  encerrado_em: string | null;
  tipo_atendimento: string;
}

export interface ChamadoDBCompleto extends ChamadoDB {
  usuarioNome: string;
}

export async function buscarChamados(
  type?: string,
  status?: string
): Promise<ChamadoDBCompleto[]> {
  const db = await connectDB();

  let query =
    "SELECT c.*, u.nome as usuarioNome FROM chamados c JOIN usuarios u ON c.usuario_id = u.id";

  const params: string[] = [];

  if (type && status) {
    query += " WHERE tipo_atendimento = ? AND status = ?";
    params.push(type, status);
  } else if (type) {
    query += " WHERE tipo_atendimento = ?";
    params.push(type);
  } else if (status) {
    query += " WHERE status = ?";
    params.push(status);
  }

  const chamados = await db.all<ChamadoDBCompleto[]>(query, params);
  await db.close();

  return chamados;
}

export async function buscarChamadosPorUsuarioId(
  usuarioId: number,
  type?: string,
  status?: string
): Promise<ChamadoDB[]> {
  const db = await connectDB();

  let query =
    "SELECT c.*, u.nome as usuarioNome FROM chamados c JOIN usuarios u ON c.usuario_id = u.id WHERE c.usuario_id = ?";

  const params: string[] = [usuarioId.toString()];

  if (type && status) {
    query += " AND tipo_atendimento = ? AND status = ?";
    params.push(type, status);
  } else if (type) {
    query += " AND tipo_atendimento = ?";
    params.push(type);
  } else if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  const chamados = await db.all<ChamadoDB[]>(query, params);
  await db.close();

  return chamados;
}

export async function buscarChamadosPorId(
  id: number
): Promise<ChamadoDBCompleto | undefined> {
  const db = await connectDB();
  const chamado = await db.get<ChamadoDBCompleto>(
    "SELECT c.*, u.nome FROM chamados c JOIN usuarios u ON c.usuario_id = u.id WHERE c.id = ?",
    [id]
  );

  await db.close();
  return chamado;
}

export async function inserirChamado(
  titulo: string,
  descricao: string,
  usuarioId: number,
  tipoAdentimento: string
) {
  const db = await connectDB();
  await db.run(
    "INSERT INTO chamados (titulo, descricao, usuario_id, tipo_atendimento) VALUES (?, ?, ?, ?)",
    titulo,
    descricao,
    usuarioId,
    tipoAdentimento
  );

  await db.close();
}

export async function atualizarChamado(
  id: number,
  titulo: string,
  descricao: string
) {
  const db = await connectDB();
  await db.run(
    "UPDATE chamados SET titulo = ?, descricao = ? WHERE id = ?",
    titulo,
    descricao,
    id
  );

  await db.close();
}

export async function atualizarStatusChamado(id: number, status: string) {
  const db = await connectDB();

  let stmt;

  if (["fechado", "cancelado"].includes(status)) {
    stmt = await db.prepare(
      "UPDATE chamados SET status = ?, encerrado_em = CURRENT_TIMESTAMP WHERE id = ?"
    );
  } else {
    stmt = await db.prepare("UPDATE chamados SET status = ? WHERE id = ?");
  }

  await stmt.run(status, id);
  await stmt.finalize();
}

export async function cancelarChamado(id: number) {
  const db = await connectDB();
  
  await db.run(
    "UPDATE chamados SET status = 'cancelado', encerrado_em = CURRENT_TIMESTAMP WHERE id = ?",
    [id]
  );

  await db.close();
}
