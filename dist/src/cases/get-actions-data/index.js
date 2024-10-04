"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionsData = void 0;
const urunner_lib_1 = require("urunner-lib");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-actions-data/impl");
// Crea un adaptador
const adapter = (fn) => async (input, dependencies) => {
    const { logger: log } = dependencies;
    try {
        const response = await fn(input, dependencies);
        return {
            data: response.data,
            status: "success",
            message: "Ok",
        };
    }
    catch (error) {
        log.error(error);
        return {
            data: null,
            status: "error",
            message: "Error obteniendo la información de las acciones.",
        };
    }
};
// Define el caso de uso de obtención de datos de acciones
const getActionsData = async (params, dependencies) => {
    const { logger: log, actionsService } = dependencies;
    try {
        const response = await actionsService.getActions(params);
        return {
            data: response || null,
            status: "success",
            message: "Ok",
        };
    }
    catch (error) {
        log.error(error);
        return {
            data: null,
            status: "error",
            message: "Error obteniendo la información de las acciones.",
        };
    }
};
exports.getActionsData = getActionsData;
// Crea la instancia del caso de uso
const usecaseGetActionsData = (0, urunner_lib_1.createApp)(adapter(exports.getActionsData)).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.actionsService = new impl_1.ActionsServiceImpl();
});
exports.default = usecaseGetActionsData;
//# sourceMappingURL=index.js.map