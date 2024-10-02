import "dotenv/config";
import { App } from "@/runtime";
import Constants from "@/shared/constants";
import { Logger } from "@/shared/logger";
import { getCompanyDataCaseType, Input } from "@/cases/get-company-data/types";
import { CompanyServiceImpl } from "@/cases/get-company-data/impl";
import { response } from "express";
import { usecaseResult } from "@/shared/cases";

const adapterGetCompanyData =
  (fn: getCompanyDataCaseType<usecaseResult>) =>
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

export const getCompanyData =
  (): getCompanyDataCaseType<usecaseResult> =>
  async (params: Input, dependencies: any) => {
    const { logger: log, companyService } = dependencies;

    try {
      const response = await companyService.getCompany(params);
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

const usecaseGetCompanyData = App(
  adapterGetCompanyData(getCompanyData())
).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.companyService = new CompanyServiceImpl();
});

export default usecaseGetCompanyData;
