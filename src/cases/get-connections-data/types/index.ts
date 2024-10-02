import { Logger } from "@/shared/logger";
import ConnectionsServiceManager from "@/cases/get-connections-data/manager/";

export type Output = {
  test: string;
};

export type Input = {
  con_Nitempresa: string;
};

export type getConnectionsDataCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  connectionsService: ConnectionsServiceManager;
}
