import CompanyServiceManager from "@/cases/get-company-data/manager/";
import CompanyController from "@/controllers/companyController";
import { Company } from "@/domain/company";
import { Input } from "../types";

export class CompanyServiceImpl implements CompanyServiceManager {
  getCompany(params: Input): Promise<Company | undefined> {
    return new CompanyController().getCompany(params);
  }
}
