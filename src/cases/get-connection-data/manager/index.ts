import { Input } from "@/cases/get-connection-data/types";
import { Connection } from "@/domain/connections";

export default interface ConnectionsServiceManager {
  getConnection(params: Input): Promise<Connection | undefined>;
}
