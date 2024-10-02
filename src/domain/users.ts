export type User = {
  Idusuario: number;                  // int NOT NULL AUTO_INCREMENT
  Usuario: string;                    // varchar(20) NOT NULL
  Password: string;                   // varchar(20) NOT NULL
  Tipo?: number | null;               // int DEFAULT NULL
  Nombre?: string | null;             // varchar(100) DEFAULT NULL
  Cargo?: string | null;              // varchar(30) DEFAULT NULL
  Departamento?: string | null;       // varchar(20) DEFAULT NULL
  Idprefijoevento?: number | null;    // int DEFAULT NULL
  Idprefijoevtacuse: number;          // int NOT NULL
  Grupo: number;                     // int NOT NULL
};