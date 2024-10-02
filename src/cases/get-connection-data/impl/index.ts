import ConnectionsServiceManager from "@/cases/get-connection-data/manager/";
import { Connection } from "@/domain/connections";
import ConnectionsController from "@/controllers/connectionsController";
import { Input } from "@/cases/get-connection-data/types";

export class ConnectionsServiceImpl implements ConnectionsServiceManager {
  getConnection(params: Input): Promise<Connection | undefined> {
    return new ConnectionsController().getConnection(params);
  }
}
