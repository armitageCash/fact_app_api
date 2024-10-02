"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("@/shared/repository"));
class AuthRepository extends repository_1.default {
    constructor() {
        super();
    }
    async findUser(input) {
        return this.database
            .instance("users") // Especifique el nombre de la tabla aquí
            .where(input)
            .first();
    }
}
exports.default = AuthRepository;
