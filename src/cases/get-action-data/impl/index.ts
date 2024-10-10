import ActionsServiceManager from "@/cases/get-actions-data/manager/";
import { Input } from "../types";
import { Acciones } from "@/domain/acciones";
import ActionsController from "@/controllers/actionsController";

export class ActionsServiceImpl implements ActionsServiceManager {
  getActions(params: Input): Promise<Acciones[] | undefined> {
    return new ActionsController().getActions(params);
  }

  getAction(params: Input): Promise<Acciones | undefined> {
    return new ActionsController().getActionByNit(params);
  }
}
