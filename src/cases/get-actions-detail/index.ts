import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import {
  getActionDataDetailCaseType,
  Input,
} from "@/cases/get-actions-detail/types";
import { ActionsServiceImpl } from "@/cases/get-actions-detail/impl";

import { usecaseResult } from "@/shared/cases";

const adapterGetActionDetailData =
  (fn: getActionDataDetailCaseType<usecaseResult>) =>
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

export const getActionDetailData =
  (): getActionDataDetailCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, actionsService } = dependencies;

    try {
      const response = await actionsService.getAction(params);
      return response[0] || [];
    } catch (error) {
      const caseResult: usecaseResult = {
        data: null,
        message: "Error obteniendo la información del detalle de la acción.",
        status: "error",
      };
      return caseResult;
    }
  };

const usecaseGetActionData = App(
  adapterGetActionDetailData(getActionDetailData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.actionsService = new ActionsServiceImpl();
});

export default usecaseGetActionData;
