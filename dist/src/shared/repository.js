"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("@/services/knex"));
class Repository {
    constructor() {
        this.database = new knex_1.default();
    }
    async find(query) {
        return [];
    }
    findOne(id) {
        return Promise.resolve({});
    }
    createOne(data) {
        return Promise.resolve({});
    }
    updateOne(id, data) {
        return Promise.resolve({});
    }
    deleteOne(id) {
        return Promise.resolve(true);
    }
}
exports.default = Repository;
//# sourceMappingURL=repository.js.map