import "module-alias/register";
import express from "express";
import routes from "@/routes";
import dotenv from "dotenv";
import { authenticateToken } from "./util/middleware";
import cors from "cors";
// Cargar las variables de entorno desde el archivo .env
dotenv.config();
// Crea una instancia de Express
const app = express();
app.use(express.json());

// Configura el middleware
app.use(cors());

// Usa las rutas definidas en el archivo de rutas
app.use("/api", authenticateToken, routes);

// Configura el puerto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
