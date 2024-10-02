"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsServiceImpl = void 0;
const actionsController_1 = __importDefault(require("@/controllers/actionsController"));
class ActionsServiceImpl {
    updateAction(params) {
        return new actionsController_1.default().updateAction(params);
    }
}
exports.ActionsServiceImpl = ActionsServiceImpl;
