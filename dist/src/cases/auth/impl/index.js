"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceImpl = void 0;
const authController_1 = __importDefault(require("@/controllers/authController"));
class AuthServiceImpl {
    async auth(params) {
        return new authController_1.default().login(params);
    }
}
exports.AuthServiceImpl = AuthServiceImpl;
//# sourceMappingURL=index.js.map