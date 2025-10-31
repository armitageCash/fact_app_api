import knex from "knex";
import { Logger } from "@/shared/logger";

export default class DatabaseService {
  private static _instance: DatabaseService;
  instance: knex.Knex<any, unknown[]>;
  private logger: Logger;

  private constructor() {
    this.logger = new Logger();

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
        afterCreate: (conn: any, done: any) => {
          this.logger.debug("Nueva conexión creada en el pool");
          done(null, conn);
        },
      },
      // Configuración adicional para debugging
      debug: process.env.NODE_ENV === "development",
      log: {
        warn: (message: string) =>
          this.logger.warn("Knex Warning", { message }),
        error: (message: string) =>
          this.logger.error("Knex Error", { message }),
        deprecate: (message: string) =>
          this.logger.warn("Knex Deprecation", { message }),
        debug: (message: string) =>
          this.logger.debug("Knex Debug", { message }),
      },
    };

    this.instance = knex(dbConfig);
    this.setupPoolEventListeners();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService._instance) {
      DatabaseService._instance = new DatabaseService();
    }
    return DatabaseService._instance;
  }

  // Configurar listeners de eventos del pool
  private setupPoolEventListeners(): void {
    const pool = (this.instance.client as any).pool;

    if (pool) {
      pool.on("createRequest", () => {
        this.logger.debug("Pool: Solicitando nueva conexión");
      });

      pool.on("createSuccess", () => {
        this.logger.debug("Pool: Conexión creada exitosamente");
      });

      pool.on("createFail", (err: Error) => {
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
  getPoolStats(): any {
    const pool = (this.instance.client as any).pool;
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
  async destroy(): Promise<void> {
    if (this.instance) {
      this.logger.info("Cerrando pool de conexiones de base de datos");
      await this.instance.destroy();
    }
  }
}
