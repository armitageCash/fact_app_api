"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv/config");
const runtime_1 = require("@/runtime");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/auth/impl");
const adapterAuth = (fn) => async (params, dependencies) => {
    return await fn(params, dependencies);
};
const auth = async (params, dependencies) => {
    const { logger: log, authService } = dependencies;
    try {
        const response = await authService.auth(params);
        log.info(response);
        return {
            data: response,
            status: "success",
            message: "Logueado correctamente.",
        };
    }
    catch (e) {
        const caseResult = {
            data: null,
            message: "Usuario no encontrado",
            status: "error",
        };
        return caseResult;
    }
};
exports.auth = auth;
const usecaseAuth = (0, runtime_1.App)(adapterAuth(exports.auth)).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.authService = new impl_1.AuthServiceImpl();
});
exports.default = usecaseAuth;
