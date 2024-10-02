import { Logger } from "@/shared/logger";
import CompanyServiceManager from "@/cases/get-company-data/manager/";

export type Output = {
  test: string;
};

export type Input = {
  Nitempresa: string;
};

export type getCompanyDataCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  companyService: CompanyServiceManager;
}
