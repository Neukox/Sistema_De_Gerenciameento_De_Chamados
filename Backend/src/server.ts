import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./minhaAPI/routes/usuarioRoutes";
import chamadosRoutes from "./minhaAPI/routes/chamadosRoutes";
import path from "path";
import { setupWebSocketServer } from "./minhaAPI/sockets/connection";
import http from "http";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Cria o servidor HTTP manualmente
const server = http.createServer(app);

// Configura WebSocket usando o mesmo servidor
setupWebSocketServer(server);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/", usuarioRoutes);
app.use("/chamados", chamadosRoutes);

app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando!");
});

// Inicia o servidor Express + WebSocket
server.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
