"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("@/shared/repository"));
class CompanyRepository extends repository_1.default {
    constructor() {
        super();
    }
    async getCompany(params) {
        return this.database.instance.raw("SELECT * FROM Empresa LEFT JOIN EmpresaUsuario ON Empresa.Nit = EmpresaUsuario.Nitempresa WHERE EmpresaUsuario.Nitempresa = ?", [params.Nitempresa]);
    }
    async getCompanies(params) {
        return this.database.instance.raw("SELECT EMP.*, U.*, E.* FROM EmpresaUsuario E INNER JOIN Users U ON E.Idusuario = U.Idusuario INNER JOIN Empresa EMP ON EMP.Nit = E.Nitempresa WHERE U.Grupo = (SELECT Grupo FROM Users WHERE Idusuario = ?);", [params.Idusuario]);
    }
}
exports.default = CompanyRepository;
//# sourceMappingURL=company.js.map