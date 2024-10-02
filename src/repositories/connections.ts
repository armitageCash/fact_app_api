import Repository from "@/shared/repository";
import { Company } from "@/domain/company";
import { Input } from "@/cases/get-connections-data/types";
import { Input as InputConnection } from "@/cases/get-connection-data/types";
import { Connection } from "@/domain/connections";

export default class ConnectionsRepository extends Repository {
  constructor() {
    super();
  }

  async getConnections(params: Input): Promise<Connection | undefined> {
    try {
      return this.database.instance.raw(
        "SELECT  * FROM conexiones  WHERE con_Nitempresa = ?",
        [params.con_Nitempresa]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getConnection(
    params: InputConnection
  ): Promise<Connection | undefined> {
    return this.database.instance.raw(
      "SELECT  * FROM conexiones  WHERE Id = ?",
      [params.Id]
    );
  }
}
