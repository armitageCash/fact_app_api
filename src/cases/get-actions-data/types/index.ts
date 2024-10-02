import { Logger } from "@/shared/logger";
import ActionsServiceManager from "@/cases/get-actions-data/manager/";

export type Output = {
  test: string;
};

export type Input = {
  nit: string;
};

export type getActionsDataCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  ActionsService: ActionsServiceManager;
}
