import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname,
  "../../../../BancodeDados",
  "database.sqlite"
);

// Função para conectar ao banco
async function connectDB() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Conectado ao banco de dados SQLite!");
    console.log("Caminho do banco de dados:", dbPath);
    return db;
  } catch (error: any) {
    console.error("Erro ao conectar ao banco:", error.message, error.stack);
    process.exit(1);
  }
}

// Testar conexão
connectDB();

export default connectDB;
