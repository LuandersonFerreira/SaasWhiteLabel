import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Para funcionar __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve os arquivos estáticos do build (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// Rota catch-all para SPA (React Router)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
