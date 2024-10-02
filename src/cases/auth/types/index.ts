import { Logger } from "@/shared/logger";
import authServiceManager from "@/cases/auth/manager";
import { User } from "@/domain/users";

export type Output = {
  Idusuario: number; // int NOT NULL AUTO_INCREMENT
  Usuario: string; // varchar(20) NOT NULL
  Password: string; // varchar(20) NOT NULL
  Tipo?: number | null; // int DEFAULT NULL
  Nombre?: string | null; // varchar(100) DEFAULT NULL
  Cargo?: string | null; // varchar(30) DEFAULT NULL
  Departamento?: string | null; // varchar(20) DEFAULT NULL
  Idprefijoevento?: number | null; // int DEFAULT NULL
  Idprefijoevtacuse: number; // int NOT NULL
  Grupo: number;
};

export type Input = {
  Usuario: string;
  Password: string;
};

export type authData = {
  user?: User;
  jwt?: string;
};

export type authCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  authService: authServiceManager;
}
