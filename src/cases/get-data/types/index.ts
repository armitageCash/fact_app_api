import { Logger } from '../../../shared/logger';
import CompanyServiceManager from '../manager';

export type Output = {
    test: string
}

export interface DependenciesType {
    logger: Logger;
    companyService: CompanyServiceManager;
};

export type companyServiceCaseType<T> = (dependencies: DependenciesType) => Promise<T | null>;