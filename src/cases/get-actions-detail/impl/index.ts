import ActionsServiceManager from "@/cases/get-actions-detail/manager/";
import { Acciones } from "@/domain/acciones";
import ActionsController from "@/controllers/actionsController";
import { Input as InputDetail } from "@/cases/get-actions-detail/types";
import { Input } from "@/cases/get-actions-data/types";

export class ActionsServiceImpl implements ActionsServiceManager {
  getActions(params: Input): Promise<Acciones | undefined> {
    throw new Error("Method not implemented.");
  }
  getAction(params: InputDetail): Promise<Acciones | undefined> {
    return new ActionsController().getAction(params);
  }
}
