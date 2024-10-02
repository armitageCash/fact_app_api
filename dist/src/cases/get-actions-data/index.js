"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionsData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-actions-data/impl");
const adapterGetActionsData = (fn) => async (input, dependencies) => {
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
const getActionsData = () => async (params, dependencies) => {
    const { logger: log, actionsService } = dependencies;
    try {
        const response = await actionsService.getActions(params);
        return response[0] || [];
    }
    catch (error) {
        const caseResult = {
            data: null,
            message: "Error obteniendo la información de las acciones.",
            status: "error",
        };
        return caseResult;
    }
};
exports.getActionsData = getActionsData;
const usecaseGetActionsData = (0, runtime_1.App)(adapterGetActionsData((0, exports.getActionsData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.actionsService = new impl_1.ActionsServiceImpl();
});
exports.default = usecaseGetActionsData;
