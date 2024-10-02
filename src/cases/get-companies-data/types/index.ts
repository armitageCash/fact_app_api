import { Logger } from "@/shared/logger";
import CompanyServiceManager from "@/cases/get-companies-data/manager/";

export type Output = {
  test: string;
};

export type Input = {
  Idusuario: string;
};

export type getCompaniesDataCaseType<T> = (
  input: Input,
  dependencies: DependenciesType
) => Promise<T | null>;

export interface DependenciesType {
  logger: Logger;
  companyService: CompanyServiceManager;
}
