import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import {
  updateActionsDataCaseType,
  Input,
} from "@/cases/update-actions-data/types";
import { ActionsServiceImpl } from "@/cases/update-actions-data/impl";

import { usecaseResult } from "@/shared/cases";

const adapterUpdateActionsData =
  (fn: updateActionsDataCaseType<usecaseResult>) =>
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
      return {
        data: "ocurrio un error al actualizar la acción",
        status: "failed",
        message: error.message,
      };
    }
  };

export const updateActionsData =
  (): updateActionsDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, actionsService } = dependencies;

    try {
      const response = await actionsService.updateAction(params);
      return response || [];
    } catch (error) {
      return null;
    }
  };

const usecaseUpdateActionsData = App(
  adapterUpdateActionsData(updateActionsData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.actionsService = new ActionsServiceImpl();
});

export default usecaseUpdateActionsData;
