import { Acciones } from "@/domain/acciones";
import { Input as InputDetail } from "@/cases/get-actions-detail/types";

export default interface ActionsServiceManager {
  getAction(params: InputDetail): Promise<Acciones | undefined>;
}
