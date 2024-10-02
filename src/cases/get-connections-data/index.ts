import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import {
  getConnectionsDataCaseType,
  Input,
} from "@/cases/get-connections-data/types";
import { ConnectionsServiceImpl } from "@/cases/get-connections-data/impl";
import { usecaseResult } from "@/shared/cases";

const adapterGetConnectionsData =
  (fn: getConnectionsDataCaseType<usecaseResult>) =>
  async (input: Input, dependencies: any) => {
    const { logger: log } = dependencies;

    try {
      const response = await fn(input, dependencies);
      return {
        data: response,
        status: "success",
        message: "Ok",
      };
    } catch (error: any) {
      log.error(error);
    }
  };

export const getConnectionsData =
  (): getConnectionsDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, connectionsService } = dependencies;

    try {
      const response = await connectionsService.getConnections(params);
      return response[0];
    } catch (error) {
      const caseResult: usecaseResult = {
        data: null,
        message: "Error obteniendo la información de las conexiones.",
        status: "error",
      };
      return caseResult;
    }
  };

const usecaseGetConnectionsData = App(
  adapterGetConnectionsData(getConnectionsData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.connectionsService = new ConnectionsServiceImpl();
});

export default usecaseGetConnectionsData;
