"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-company-data/impl");
const adapterGetCompanyData = (fn) => async (input, dependencies) => {
    const { logger: log } = dependencies;
    try {
        const response = await fn(input, dependencies);
        return {
            data: response,
            status: "success",
            message: "Ok",
        };
    }
    catch (error) {
        log.error(error);
    }
};
const getCompanyData = () => async (params, dependencies) => {
    const { logger: log, companyService } = dependencies;
    try {
        const response = await companyService.getCompany(params);
        return response[0];
    }
    catch (error) {
        const caseResult = {
            data: null,
            message: "Error obteniendo la informacion de empresa.",
            status: "error",
        };
        return caseResult;
    }
};
exports.getCompanyData = getCompanyData;
const usecaseGetCompanyData = (0, runtime_1.App)(adapterGetCompanyData((0, exports.getCompanyData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.companyService = new impl_1.CompanyServiceImpl();
});
exports.default = usecaseGetCompanyData;
