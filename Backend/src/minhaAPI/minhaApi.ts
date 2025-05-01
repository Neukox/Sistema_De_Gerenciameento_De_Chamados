import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("🚀 API funcionando!");
});

// ✅ Exportando corretamente
export default router;
