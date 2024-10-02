"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyServiceImpl = void 0;
const companyController_1 = __importDefault(require("@/controllers/companyController"));
class CompanyServiceImpl {
    getCompany(params) {
        return new companyController_1.default().getCompany(params);
    }
    getCompanies(params) {
        return new companyController_1.default().getCompanies(params);
    }
}
exports.CompanyServiceImpl = CompanyServiceImpl;
