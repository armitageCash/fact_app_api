"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-connection-data/impl");
const adapterGetConnectionData = (fn) => async (input, dependencies) => {
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
const getConnectionData = () => async (params, dependencies) => {
    const { logger: log, connectionsService } = dependencies;
    try {
        const response = await connectionsService.getConnection(params);
        console.log("response", response);
        return response[0];
    }
    catch (error) {
        const caseResult = {
            data: null,
            message: "Error obteniendo la información de las conexiones.",
            status: "error",
        };
        return caseResult;
    }
};
exports.getConnectionData = getConnectionData;
const usecaseGetConnectionData = (0, runtime_1.App)(adapterGetConnectionData((0, exports.getConnectionData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.connectionsService = new impl_1.ConnectionsServiceImpl();
});
exports.default = usecaseGetConnectionData;
//# sourceMappingURL=index.js.map