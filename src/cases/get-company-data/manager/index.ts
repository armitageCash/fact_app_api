import { Company } from "@/domain/company";
import { Input } from "@/cases/get-company-data/types";

export default interface CompanyServiceManager {
  getCompany(params: Input): Promise<Company | undefined>;
}
