import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import {
  getConnectionDataCaseType,
  Input,
} from "@/cases/get-connection-data/types";
import { ConnectionsServiceImpl } from "@/cases/get-connection-data/impl";
import { usecaseResult } from "@/shared/cases";

const adapterGetConnectionData =
  (fn: getConnectionDataCaseType<usecaseResult>) =>
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

export const getConnectionData =
  (): getConnectionDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, connectionsService } = dependencies;

    try {
      const response = await connectionsService.getConnection(params);
      console.log("response", response);
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

const usecaseGetConnectionData = App(
  adapterGetConnectionData(getConnectionData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.connectionsService = new ConnectionsServiceImpl();
});

export default usecaseGetConnectionData;
