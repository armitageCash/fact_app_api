"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsServiceImpl = void 0;
const connectionsController_1 = __importDefault(require("@/controllers/connectionsController"));
class ConnectionsServiceImpl {
    getConnection(params) {
        return new connectionsController_1.default().getConnection(params);
    }
}
exports.ConnectionsServiceImpl = ConnectionsServiceImpl;
