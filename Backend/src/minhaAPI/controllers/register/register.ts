import { gerarParDeChaves } from "../../criptografia/criptografiaE2EE";
import connectDB from "../../bancodedados/bancoDeDados";
import bcrypt from "bcrypt";

interface Usuario {
  name: string;
  password: string;
  email: string;
}

export async function registerUser(usuario: Usuario) {
  try {
    const db = await connectDB();
    console.log("📦 Dados recebidos na função registerUser:", usuario);

    const { name, password, email } = usuario;

    if (!name || !password || !email) {
      throw new Error("Nome, senha e email são obrigatórios.");
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await db.get(
      "SELECT * FROM usuarios WHERE email = ?",
      email
    );
    if (usuarioExistente) {
      throw new Error("Usuário já existente.");
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido.");
    }

    // Geração das chaves e criptografia da senha
    const { publicKey, privateKey } = gerarParDeChaves();
    const senhaCriptografada = await bcrypt.hash(password, 10);

    // A chave privada já está criptografada com uma passphrase, não precisa criptografar de novo
    const chavePrivadaCriptografada = privateKey;

    // Inserir no banco
    await db.run(
      "INSERT INTO usuarios (nome, email, senha, public_key, private_key) VALUES (?, ?, ?, ?, ?)",
      name,
      email,
      senhaCriptografada,
      publicKey,
      chavePrivadaCriptografada
    );

    // busca o usuário registrado
    const usuarioRegistrado = await db.get(
      "SELECT * FROM usuarios WHERE email = ?",
      email
    );

    if (!usuarioRegistrado) {
      throw new Error("Erro ao registrar o usuário.");
    }

    // Retorna o usuário registrado
    const {
      id,
      nome: nomeRegistrado,
      email: emailRegistrado,
      tipo,
    } = usuarioRegistrado;
    const usuarioRetornado = {
      id,
      name: nomeRegistrado,
      email: emailRegistrado,
      role: tipo,
    };

    console.log("✅ Usuário registrado com sucesso!");

    return usuarioRetornado;
  } catch (error: any) {
    console.error("❌ Erro no registro:", error.message);
    throw error; // Será tratado pela rota
  }
}
