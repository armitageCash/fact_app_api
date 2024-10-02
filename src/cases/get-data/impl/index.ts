import CompanyServiceManager from "../manager";

export class CompanyServiceImpl implements CompanyServiceManager {
    getCompanyData(companyId: string, action: () => void): void {
        throw new Error("Method not implemented.");
    }
}