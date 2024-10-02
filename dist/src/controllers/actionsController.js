"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acciones_1 = __importDefault(require("@/repositories/acciones"));
class ActionsController {
    constructor() {
        this.actionsRepository = new acciones_1.default();
    }
    async getActions(params) {
        try {
            const company = await this.actionsRepository.getActions(params);
            return Promise.resolve(company);
        }
        catch (error) {
            console.log("error getting actions", error);
        }
    }
    async getAction(params) {
        try {
            const Acciones = await this.actionsRepository.getAction(params);
            return Promise.resolve(Acciones);
        }
        catch (error) {
            console.log("error getting actions", error);
        }
    }
    async updateAction(params) {
        try {
            const Acciones = await this.actionsRepository.updateAction(params);
            return Promise.resolve(Acciones);
        }
        catch (error) {
            console.log(error);
            console.log("Error updating action", error);
        }
    }
}
exports.default = ActionsController;
