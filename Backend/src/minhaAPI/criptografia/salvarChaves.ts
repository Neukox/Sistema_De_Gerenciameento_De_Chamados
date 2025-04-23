import { gerarParDeChaves } from '../criptografia/criptografiaE2EE'; // Importando a função
import { readFileSync } from 'fs'; // Para ler os arquivos gerados

// Gerar as chaves
const { publicKey, privateKey } = gerarParDeChaves();

// Exibir as chaves geradas no console
console.log("Chave pública gerada:", publicKey);
console.log("Chave privada gerada:", privateKey);

// Ler as chaves dos arquivos para verificar se foram salvas corretamente
const chavePublicaSalva = readFileSync('./chave_publica.pem', 'utf-8');
const chavePrivadaSalva = readFileSync('./chave_privada.pem', 'utf-8');

console.log("Chave pública salva no arquivo:", chavePublicaSalva);
console.log("Chave privada salva no arquivo:", chavePrivadaSalva);
