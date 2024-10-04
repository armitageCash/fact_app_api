"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connections_1 = __importDefault(require("@/repositories/connections"));
class ConnectionsController {
    constructor() {
        this.connectionsRepository = new connections_1.default();
    }
    async getConnections(params) {
        try {
            const connections = await this.connectionsRepository.getConnections(params);
            console.log("connections", connections);
            return Promise.resolve(connections);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    async getConnection(params) {
        try {
            const connection = await this.connectionsRepository.getConnection(params);
            console.log("connection", connection);
            return Promise.resolve(connection);
        }
        catch (error) {
            console.log("error", error);
        }
    }
}
exports.default = ConnectionsController;
//# sourceMappingURL=connectionsController.js.map