import { Acciones } from "@/domain/acciones";
import { Input } from "@/cases/update-actions-data/types";

export default interface ActionsServiceManager {
  updateAction(params: Input): Promise<Acciones | undefined>;
}
