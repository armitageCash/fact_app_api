import { Logger } from "@/shared/logger";
import ConnectionsServiceManager from "@/cases/get-connection-data/manager/";

export type Output = {
  test: string;
};

export type Input = {
  Id: string;
};

export type getConnectionDataCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  connectionsService: ConnectionsServiceManager;
}
