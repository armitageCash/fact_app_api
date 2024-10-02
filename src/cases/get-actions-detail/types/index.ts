import { Logger } from "@/shared/logger";
import ActionsServiceManager from "@/cases/get-actions-detail/manager/";

export type Output = {
  test: string;
};

export type Input = {
  id: string;
};

export type getActionDataDetailCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  ActionsService: ActionsServiceManager;
}
