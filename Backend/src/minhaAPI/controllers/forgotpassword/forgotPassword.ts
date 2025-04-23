import connectDB from "../../bancodedados/bancoDeDados";
import { generateToken } from "../../utils/JWT";
import { sendEmail } from "../../services/emailService";

// Função para enviar redefinição de senha pelo email
export async function forgotPassword(email: string): Promise<void> {
  const db = await connectDB();

  const user = await db.get("SELECT * FROM usuarios WHERE email = ?", email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const token = generateToken({ email }, "15m");

  await sendEmail(
    "gabrielcfonline0900@gmail.com",
    email,
    "Redefinição de Senha",
    `Clique no link para redefinir sua senha: http://localhost:5173/redefinir-senha?token=${token}`
  );
}
