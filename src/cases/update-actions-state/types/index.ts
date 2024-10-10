import { Logger } from "@/shared/logger";
import ActionsServiceManager from "@/cases/get-actions-data/manager/";
import { Acciones } from "@/domain/acciones";

export type Output = {
  test: string;
};

export type Input = {
  Acciones: Pick<Acciones, "ID" | "Tope" | "Estado" | "Nitempresa">;
};

export type updateActionsStateCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  ActionsService: ActionsServiceManager;
}
