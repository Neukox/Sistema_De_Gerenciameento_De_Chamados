import connectDB from "../../bancodedados/bancoDeDados";
import { generateToken } from "../../utils/JWT";
import { sendRecoverPasswordEmail } from "../../email/send";

// Função para enviar redefinição de senha pelo email
export async function forgotPassword(email: string): Promise<void> {
  const db = await connectDB();

  const user = await db.get("SELECT * FROM usuarios WHERE email = ?", email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const token = generateToken({ email }, "15m");

  const url = `${process.env.CLIENT_URL}/redefinir-senha?token=${token}`;

  await sendRecoverPasswordEmail(email, {
    name: user.nome,
    url,
  });
}
