"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("@/shared/repository"));
class ConnectionsRepository extends repository_1.default {
    constructor() {
        super();
    }
    async getConnections(params) {
        try {
            return this.database.instance.raw("SELECT  * FROM Conexiones  WHERE con_Nitempresa = ?", [params.con_Nitempresa]);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getConnection(params) {
        return this.database.instance.raw("SELECT  * FROM Conexiones  WHERE Id = ?", [params.Id]);
    }
}
exports.default = ConnectionsRepository;
//# sourceMappingURL=connections.js.map