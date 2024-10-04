"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsServiceImpl = void 0;
const connectionsController_1 = __importDefault(require("@/controllers/connectionsController"));
class ConnectionsServiceImpl {
    getConnections(params) {
        return new connectionsController_1.default().getConnections(params);
    }
}
exports.ConnectionsServiceImpl = ConnectionsServiceImpl;
//# sourceMappingURL=index.js.map