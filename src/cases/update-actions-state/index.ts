import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import {
  updateActionsStateCaseType,
  Input,
} from "@/cases/update-actions-state/types";
import { ActionsServiceImpl } from "@/cases/update-actions-state/impl";

import { usecaseResult } from "@/shared/cases";

const adapterUpdateActionsState =
  (fn: updateActionsStateCaseType<usecaseResult>) =>
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

export const updateActionsState =
  (): updateActionsStateCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, actionsService } = dependencies;

    try {
      const response = await actionsService.updateActionState(params);
      return response || [];
    } catch (error) {
      return null;
    }
  };

const usecaseUpdateActionsState = App(
  adapterUpdateActionsState(updateActionsState())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.actionsService = new ActionsServiceImpl();
});

export default usecaseUpdateActionsState;
