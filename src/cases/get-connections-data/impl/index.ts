import ConnectionsServiceManager from "@/cases/get-connections-data/manager/";
import { Connection } from "@/domain/connections";
import { Input } from "@/cases/get-connections-data/types";
import ConnectionsController from "@/controllers/connectionsController";

export class ConnectionsServiceImpl implements ConnectionsServiceManager {
  getConnections(params: Input): Promise<Connection | undefined> {
    return new ConnectionsController().getConnections(params);
  }
}
