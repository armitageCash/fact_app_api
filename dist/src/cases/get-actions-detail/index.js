"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionDetailData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-actions-detail/impl");
const adapterGetActionDetailData = (fn) => async (input, dependencies) => {
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
const getActionDetailData = () => async (params, dependencies) => {
    const { logger: log, actionsService } = dependencies;
    try {
        const response = await actionsService.getAction(params);
        return response[0] || [];
    }
    catch (error) {
        const caseResult = {
            data: null,
            message: "Error obteniendo la información del detalle de la acción.",
            status: "error",
        };
        return caseResult;
    }
};
exports.getActionDetailData = getActionDetailData;
const usecaseGetActionData = (0, runtime_1.App)(adapterGetActionDetailData((0, exports.getActionDetailData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.actionsService = new impl_1.ActionsServiceImpl();
});
exports.default = usecaseGetActionData;
//# sourceMappingURL=index.js.map