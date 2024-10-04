"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv/config");
const urunner_lib_1 = require("urunner-lib");
const logger_1 = require("@/shared/logger");
const impl_1 = require("@/cases/auth/impl");
// Crea un adaptador
const adapter = (fn) => async (params, dependencies) => {
    return await fn(params, dependencies);
};
// Define el caso de uso de autenticación
const auth = async (params, dependencies) => {
    const { logger: log, authService } = dependencies;
    try {
        const response = await authService.auth(params);
        return {
            data: response,
            status: "success",
            message: "Logueado correctamente.",
        };
    }
    catch (e) {
        console.log("e", e);
        return {
            data: null,
            message: "Usuario no encontrado",
            status: "error",
        };
    }
};
exports.auth = auth;
// Crea la instancia del caso de uso
const usecaseAuth = (0, urunner_lib_1.createApp)(adapter(exports.auth)).attach((dependencies) => {
    dependencies.logger = new logger_1.Logger();
    dependencies.authService = new impl_1.AuthServiceImpl();
});
exports.default = usecaseAuth;
//# sourceMappingURL=index.js.map