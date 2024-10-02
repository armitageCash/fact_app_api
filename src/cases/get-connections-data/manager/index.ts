import { Input } from "@/cases/get-connections-data/types";
import { Connection } from "@/domain/connections";

export default interface ConnectionsServiceManager {
  getConnections(params: Input): Promise<Connection | undefined>;
}
