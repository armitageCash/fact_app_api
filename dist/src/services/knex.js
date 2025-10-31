"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const logger_1 = require("@/shared/logger");
class DatabaseService {
    constructor() {
        this.logger = new logger_1.Logger();
        const dbConfig = {
            client: "mysql2", // Cambia 'mysql' a 'mysql2' para el driver más reciente
            connection: {
                host: process.env.DB_HOST || "localhost",
                port: Number(process.env.DB_PORT) || 3306,
                user: process.env.DB_USER || "root",
                password: process.env.DB_PASS,
                database: process.env.DATABASE || "fact_app",
            },
            pool: {
                min: 5, // Número mínimo de conexiones en el pool
                max: 30, // Número máximo de conexiones simultáneas
                acquireTimeoutMillis: 60000, // Tiempo máximo para obtener una conexión (60 segundos)
                createTimeoutMillis: 30000, // Tiempo máximo para crear una nueva conexión (30 segundos)
                destroyTimeoutMillis: 5000, // Tiempo máximo para destruir una conexión (5 segundos)
                idleTimeoutMillis: 30000, // Tiempo antes de cerrar conexiones inactivas (30 segundos)
                reapIntervalMillis: 1000, // Intervalo para verificar conexiones inactivas (1 segundo)
                createRetryIntervalMillis: 200, // Intervalo entre reintentos de creación de conexión
                propagateCreateError: false, // No propagar errores de creación inmediatamente
                // Eventos del pool para logging
                afterCreate: (conn, done) => {
                    this.logger.debug("Nueva conexión creada en el pool");
                    done(null, conn);
                },
            },
            // Configuración adicional para debugging
            debug: process.env.NODE_ENV === "development",
            log: {
                warn: (message) => this.logger.warn("Knex Warning", { message }),
                error: (message) => this.logger.error("Knex Error", { message }),
                deprecate: (message) => this.logger.warn("Knex Deprecation", { message }),
                debug: (message) => this.logger.debug("Knex Debug", { message }),
            },
        };
        this.instance = (0, knex_1.default)(dbConfig);
        this.setupPoolEventListeners();
    }
    static getInstance() {
        if (!DatabaseService._instance) {
            DatabaseService._instance = new DatabaseService();
        }
        return DatabaseService._instance;
    }
    // Configurar listeners de eventos del pool
    setupPoolEventListeners() {
        const pool = this.instance.client.pool;
        if (pool) {
            pool.on("createRequest", () => {
                this.logger.debug("Pool: Solicitando nueva conexión");
            });
            pool.on("createSuccess", () => {
                this.logger.debug("Pool: Conexión creada exitosamente");
            });
            pool.on("createFail", (err) => {
                this.logger.error("Pool: Error al crear conexión", {
                    error: err.message,
                });
            });
            pool.on("destroyRequest", () => {
                this.logger.debug("Pool: Solicitando destruir conexión");
            });
            pool.on("destroySuccess", () => {
                this.logger.debug("Pool: Conexión destruida exitosamente");
            });
            pool.on("poolDestroySuccess", () => {
                this.logger.info("Pool: Pool de conexiones destruido exitosamente");
            });
        }
    }
    // Obtener estadísticas del pool
    getPoolStats() {
        const pool = this.instance.client.pool;
        if (pool) {
            return {
                size: pool.size,
                available: pool.available,
                borrowed: pool.borrowed,
                invalid: pool.invalid,
                pending: pool.pending,
            };
        }
        return null;
    }
    // Método para cerrar todas las conexiones del pool (útil para testing o shutdown)
    async destroy() {
        if (this.instance) {
            this.logger.info("Cerrando pool de conexiones de base de datos");
            await this.instance.destroy();
        }
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=knex.js.map