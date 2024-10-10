import ActionsServiceManager from "@/cases/update-actions-data/manager/";
import { Input } from "../types";
import { Acciones } from "@/domain/acciones";
import ActionsController from "@/controllers/actionsController";
import { Input as inputUpdateState } from "@/cases/update-actions-state/types";

export class ActionsServiceImpl implements ActionsServiceManager {
  updateAction(params: Input): Promise<Acciones | undefined> {
    throw new Error("Method not implemented.");
  }
  updateActionState(params: inputUpdateState): Promise<Acciones | undefined> {
    return new ActionsController().updateActionState(params);
  }
}
