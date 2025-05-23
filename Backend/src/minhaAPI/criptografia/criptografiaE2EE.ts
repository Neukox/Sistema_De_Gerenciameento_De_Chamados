import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";
import { writeFileSync } from "fs";
import path from "path";

// 🛠 Gera par de chaves RSA (sem passphrase/cipher)
export function gerarParDeChaves() {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
        modulusLength: 2048, // Tamanho seguro
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
        }
    });

    // ⚠️ Apenas para debug - salva as chaves em arquivos (remova em produção)
    const pasta = path.resolve(__dirname); // evita problemas com __dirname
    writeFileSync(path.join(pasta, "chave_publica.pem"), publicKey);
    writeFileSync(path.join(pasta, "chave_privada.pem"), privateKey);

    return { publicKey, privateKey };
}

// 🔐 Criptografa a senha com a chave pública
export function criptografarSenha(senha: string, publicKey: string): string {
    const buffer = Buffer.from(senha, "utf-8");
    const encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}

// 🔓 Descriptografa com a chave privada
export function descriptografarSenha(criptografado: string, privateKey: string): string {
    const buffer = Buffer.from(criptografado, "base64");
    const decrypted = privateDecrypt(
        {
            key: privateKey, // 💡 Isso é necessário!
        },
        buffer
    );
    return decrypted.toString("utf-8");
}
