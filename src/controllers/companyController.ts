import { Input } from "@/cases/get-company-data/types";
import { Input as CompaniesInput } from "@/cases/get-companies-data/types";
import { Company } from "@/domain/company";
import CompanyRepository from "@/repositories/company";

export default class CompanyController {
  companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async getCompany(params: Input): Promise<Company | undefined> {
    console.log("params", params);
    try {
      const company = await this.companyRepository.getCompany(params);

      console.log("company", company);
      return Promise.resolve(company);
    } catch (error) {
      console.log("error", error);
    }
  }

  async getCompanies(params: CompaniesInput): Promise<Company | undefined> {
    console.log("params", params);
    try {
      const companies = await this.companyRepository.getCompanies(params);

      console.log("companies", companies);
      return Promise.resolve(companies);
    } catch (error) {
      console.log("error", error);
    }
  }
}
