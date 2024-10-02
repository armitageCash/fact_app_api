import "dotenv/config";
import { App } from "@/runtime";
import Constants from "@/shared/constants";
import { Logger } from "@/shared/logger";
import {
  getCompaniesDataCaseType,
  Input,
} from "@/cases/get-companies-data/types";
import { CompanyServiceImpl } from "@/cases/get-companies-data/impl";
import { usecaseResult } from "@/shared/cases";

const adapterGetCompaniesData =
  (fn: getCompaniesDataCaseType<usecaseResult>) =>
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

export const getCompaniesData =
  (): getCompaniesDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, companyService } = dependencies;

    try {
      const response = await companyService.getCompanies(params);
      return response[0];
    } catch (error) {
      const caseResult: usecaseResult = {
        data: null,
        message: "Error obteniendo la informacion de empresa.",
        status: "error",
      };
      return caseResult;
    }
  };

const usecaseGetCompaniesData = App(
  adapterGetCompaniesData(getCompaniesData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.companyService = new CompanyServiceImpl();
});

export default usecaseGetCompaniesData;
