import { Input } from "@/cases/get-connections-data/types";
import { Input as connectionInput } from "@/cases/get-connection-data/types";
import { Connection } from "@/domain/connections";
import ConnectionsRepository from "@/repositories/connections";

export default class ConnectionsController {
  connectionsRepository: ConnectionsRepository;

  constructor() {
    this.connectionsRepository = new ConnectionsRepository();
  }

  async getConnections(params: Input): Promise<Connection | undefined> {
    try {
      const connections = await this.connectionsRepository.getConnections(
        params
      );

      console.log("connections", connections);
      return Promise.resolve(connections);
    } catch (error) {
      console.log("error", error);
    }
  }

  async getConnection(
    params: connectionInput
  ): Promise<Connection | undefined> {
    try {
      const connection = await this.connectionsRepository.getConnection(params);

      console.log("connection", connection);
      return Promise.resolve(connection);
    } catch (error) {
      console.log("error", error);
    }
  }
}
