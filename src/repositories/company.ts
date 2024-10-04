import Repository from "@/shared/repository";
import { Company } from "@/domain/company";
import { Input } from "@/cases/get-company-data/types";
import { Input as InputCompanies } from "@/cases/get-companies-data/types";

export default class CompanyRepository extends Repository {
  constructor() {
    super();
  }

  async getCompany(params: Input): Promise<Company | undefined> {
    return this.database.instance.raw(
      "SELECT * FROM Empresa LEFT JOIN EmpresaUsuario ON Empresa.Nit = EmpresaUsuario.Nitempresa WHERE EmpresaUsuario.Nitempresa = ?",
      [params.Nitempresa]
    );
  }

  async getCompanies(params: InputCompanies): Promise<Company | undefined> {
    return this.database.instance.raw(
      "SELECT EMP.*, U.*, E.* FROM EmpresaUsuario E INNER JOIN Users U ON E.Idusuario = U.Idusuario INNER JOIN Empresa EMP ON EMP.Nit = E.Nitempresa WHERE U.Grupo = (SELECT Grupo FROM Users WHERE Idusuario = ?);",
      [params.Idusuario]
    );
  }
}
