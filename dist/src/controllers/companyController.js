"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = __importDefault(require("@/repositories/company"));
class CompanyController {
    constructor() {
        this.companyRepository = new company_1.default();
    }
    async getCompany(params) {
        console.log("params", params);
        try {
            const company = await this.companyRepository.getCompany(params);
            console.log("company", company);
            return Promise.resolve(company);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    async getCompanies(params) {
        console.log("params", params);
        try {
            const companies = await this.companyRepository.getCompanies(params);
            console.log("companies", companies);
            return Promise.resolve(companies);
        }
        catch (error) {
            console.log("error", error);
        }
    }
}
exports.default = CompanyController;
