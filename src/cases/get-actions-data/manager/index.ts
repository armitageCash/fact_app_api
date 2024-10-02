import { Acciones } from "@/domain/acciones";
import { Input } from "@/cases/get-actions-data/types";

export default interface ActionsServiceManager {
  getActions(params: Input): Promise<Acciones | undefined>;
}
