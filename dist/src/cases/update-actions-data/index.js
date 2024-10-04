"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActionsData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/update-actions-data/impl");
const adapterUpdateActionsData = (fn) => async (input, dependencies) => {
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
        return {
            data: "ocurrio un error al actualizar la acción",
            status: "failed",
            message: error.message,
        };
    }
};
const updateActionsData = () => async (params, dependencies) => {
    const { logger: log, actionsService } = dependencies;
    try {
        const response = await actionsService.updateAction(params);
        return response || [];
    }
    catch (error) {
        return null;
    }
};
exports.updateActionsData = updateActionsData;
const usecaseUpdateActionsData = (0, runtime_1.App)(adapterUpdateActionsData((0, exports.updateActionsData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.actionsService = new impl_1.ActionsServiceImpl();
});
exports.default = usecaseUpdateActionsData;
//# sourceMappingURL=index.js.map