"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
class DatabaseService {
    constructor() {
        const dbConfig = {
            client: "mysql", // Cambia 'mysql' a 'mysql2' para el driver más reciente
            connection: {
                host: process.env.DB_HOST || "localhost",
                port: process.env.DB_PORT || 3306,
                user: process.env.DB_USER || "root",
                database: process.env.DATABASE || "fact_app",
            },
            pool: {
                min: 2, // Número mínimo de conexiones
                max: 10, // Número máximo de conexiones simultáneas
            },
        };
        this.instance = (0, knex_1.default)(dbConfig);
    }
}
exports.default = DatabaseService;
