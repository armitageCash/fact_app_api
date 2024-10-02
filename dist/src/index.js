"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("@/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./util/middleware");
const cors_1 = __importDefault(require("cors"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Crea una instancia de Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configura el middleware
app.use((0, cors_1.default)());
// Usa las rutas definidas en el archivo de rutas
app.use("/api", middleware_1.authenticateToken, routes_1.default);
// Configura el puerto
const PORT = process.env.PORT || 3000;
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
