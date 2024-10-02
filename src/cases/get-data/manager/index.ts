export default interface CompanyServiceManager {
    getCompanyData(companyId: string, action: () => void):void;
}