import ActionsServiceManager from "@/cases/update-actions-data/manager/";
import { Input } from "../types";
import { Acciones } from "@/domain/acciones";
import ActionsController from "@/controllers/actionsController";

export class ActionsServiceImpl implements ActionsServiceManager {
  updateAction(params: Input): Promise<Acciones | undefined> {
    return new ActionsController().updateAction(params);
  }
}
