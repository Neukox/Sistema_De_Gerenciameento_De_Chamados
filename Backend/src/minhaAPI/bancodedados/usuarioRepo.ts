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
