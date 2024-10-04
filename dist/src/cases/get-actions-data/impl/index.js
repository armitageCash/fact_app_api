"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsServiceImpl = void 0;
const actionsController_1 = __importDefault(require("@/controllers/actionsController"));
class ActionsServiceImpl {
    getActions(params) {
        return new actionsController_1.default().getActions(params);
    }
}
exports.ActionsServiceImpl = ActionsServiceImpl;
//# sourceMappingURL=index.js.map