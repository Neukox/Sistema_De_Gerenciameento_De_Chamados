import jwt, { JwtPayload } from "jsonwebtoken";

type payloadType = string | object | Buffer | JwtPayload;

// Função para gerar um token JWT
export function generateToken(payload: payloadType, expires: string): string {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expires,
  } as jwt.SignOptions);

  return token;
}

// Função para verificar um token JWT
export function decodeToken(token: string): jwt.JwtPayload {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado.");
  }
}
