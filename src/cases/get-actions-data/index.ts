import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import { getActionsDataCaseType, Input } from "@/cases/get-actions-data/types";
import { ActionsServiceImpl } from "@/cases/get-actions-data/impl";

import { usecaseResult } from "@/shared/cases";

const adapterGetActionsData =
  (fn: getActionsDataCaseType<usecaseResult>) =>
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

export const getActionsData =
  (): getActionsDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, actionsService } = dependencies;

    try {
      const response = await actionsService.getActions(params);
      return response[0] || [];
    } catch (error) {
      const caseResult: usecaseResult = {
        data: null,
        message: "Error obteniendo la información de las acciones.",
        status: "error",
      };
      return caseResult;
    }
  };

const usecaseGetActionsData = App(
  adapterGetActionsData(getActionsData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.actionsService = new ActionsServiceImpl();
});

export default usecaseGetActionsData;
