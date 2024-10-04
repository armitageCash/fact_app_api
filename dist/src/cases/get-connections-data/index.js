"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionsData = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/get-connections-data/impl");
const adapterGetConnectionsData = (fn) => async (input, dependencies) => {
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
const getConnectionsData = () => async (params, dependencies) => {
    const { logger: log, connectionsService } = dependencies;
    try {
        const response = await connectionsService.getConnections(params);
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
exports.getConnectionsData = getConnectionsData;
const usecaseGetConnectionsData = (0, runtime_1.App)(adapterGetConnectionsData((0, exports.getConnectionsData)())).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.connectionsService = new impl_1.ConnectionsServiceImpl();
});
exports.default = usecaseGetConnectionsData;
//# sourceMappingURL=index.js.map