import knex from "knex";

export default class DatabaseService {
  instance: knex.Knex<any, unknown[]>;
  constructor() {
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
        min: 2, // Número mínimo de conexiones
        max: 10, // Número máximo de conexiones simultáneas
      },
    };
    this.instance = knex(dbConfig);
  }
}
