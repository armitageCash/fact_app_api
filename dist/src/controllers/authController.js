"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("@/repositories/auth"));
const jwt_1 = require("@/services/jwt");
class AuthController {
    constructor() {
        this.authRepository = new auth_1.default();
        this.authService = new jwt_1.AuthService(process.env.JWT_SECRET || "pwd");
    }
    async login(params) {
        const user = await this.authRepository.findUser(params);
        if (user) {
            const jwt = this.authService.generateToken({
                id: 1,
                username: "admin",
            });
            return Promise.resolve({ user, jwt });
        }
        return Promise.reject("User not found");
    }
}
exports.default = AuthController;
