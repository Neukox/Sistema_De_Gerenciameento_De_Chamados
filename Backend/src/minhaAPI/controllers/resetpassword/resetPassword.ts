import bcrypt from "bcrypt";
import connectDB from "../../bancodedados/bancoDeDados";

export async function resetPassword(email: string , newPassword: string) {
  try {
    const db = await connectDB();
    const user = await db.get("SELECT * FROM usuarios WHERE email = ?", email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.run(
      "UPDATE usuarios SET senha = ? WHERE email = ?",
      hashedPassword,
      email
    );
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    throw new Error("Erro ao redefinir senha");
  }
}
