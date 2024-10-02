import CompanyServiceManager from "@/cases/get-companies-data/manager/";
import CompanyController from "@/controllers/companyController";
import { Company } from "@/domain/company";
import { Input } from "@/cases/get-company-data/types";
import { Input as InputCompanies } from "@/cases/get-companies-data/types";

export class CompanyServiceImpl implements CompanyServiceManager {
  getCompany(params: Input): Promise<Company | undefined> {
    return new CompanyController().getCompany(params);
  }
  getCompanies(params: InputCompanies): Promise<Company | undefined> {
    return new CompanyController().getCompanies(params);
  }
}
