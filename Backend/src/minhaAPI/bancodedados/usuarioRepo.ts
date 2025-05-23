import connectDB from "../bancodedados/bancoDeDados";

// Tipagem do que o banco retorna
export interface UsuarioDB {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  publicKey: string;
  privateKey: string;
}

// Busca usuário por email
export async function buscarUsuarioPorEmail(
  email: string
): Promise<UsuarioDB | undefined> {
  const db = await connectDB();
  const usuario = await db.get<UsuarioDB>(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  return usuario;
}

// Insere novo usuário
export async function inserirUsuario(
  nome: string,
  email: string,
  senha: string,
  publicKey: string,
  privateKey: string
) {
  const db = await connectDB();
  await db.run(
    "INSERT INTO usuarios (nome, email, senha, publicKey, privateKey) VALUES (?, ?, ?, ?, ?)",
    nome,
    email,
    senha,
    publicKey,
    privateKey
  );
}

export async function buscarUsuarioPorId(
  id: number
): Promise<UsuarioDB | undefined> {
  const db = await connectDB();

  const usuario = await db.get<UsuarioDB>(
    "SELECT * FROM usuarios WHERE id = ?",
    [id]
  );

  db.close();
  return usuario;
}

export async function atualizarInformacoesUsuario(
  id: number,
  nome: string,
  email: string
): Promise<void> {
  const db = await connectDB();

  await db.run("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [
    nome,
    email,
    id,
  ]);

  db.close();
}

export async function alterarSenha(id: number, senha: string): Promise<void> {
  const db = await connectDB();

  await db.run("UPDATE usuarios SET senha = ? WHERE id = ?", [senha, id]);
  db.close();
}

export async function buscarEmailsAdmins(): Promise<string[]> {
  const db = await connectDB();

  const emails = await db.all<Pick<UsuarioDB, "email">[]>(
    "SELECT email FROM usuarios WHERE tipo = 'admin'"
  );

  db.close();
  return emails.map((admin) => admin.email);
}
