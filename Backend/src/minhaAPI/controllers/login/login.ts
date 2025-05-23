import { buscarUsuarioPorEmail } from "../../bancodedados/usuarioRepo";
import bcrypt from "bcrypt";

interface Credenciais {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function Login(
  email: string,
  senha: string
): Promise<Credenciais | null> {
  if (!email || !senha) {
    throw new Error("Email ou senha não informados!");
  }

  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) return null;

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return null;

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
    role: usuario.tipo,
  };
}
