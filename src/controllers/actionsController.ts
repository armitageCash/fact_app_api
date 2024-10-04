import { Input } from "@/cases/get-actions-data/types";
import { Input as InputUpdate } from "@/cases/update-actions-data/types";
import { Input as inputDetailed } from "@/cases/get-actions-detail/types";
import { Acciones } from "@/domain/acciones";
import ActionsRepository from "@/repositories/acciones";

export default class ActionsController {
  actionsRepository: ActionsRepository;

  constructor() {
    this.actionsRepository = new ActionsRepository();
  }

  async getActions(params: Input): Promise<Acciones[] | undefined> {
    try {
      const company = await this.actionsRepository.getActions(params);
      return Promise.resolve(company);
    } catch (error) {
      console.log("error getting actions", error);
    }
  }

  async getAction(params: inputDetailed): Promise<Acciones | undefined> {
    try {
      const Acciones = await this.actionsRepository.getAction(params);
      return Promise.resolve(Acciones);
    } catch (error) {
      console.log("error getting actions", error);
    }
  }

  async updateAction(params: InputUpdate): Promise<Acciones | undefined> {
    try {
      const Acciones = await this.actionsRepository.updateAction(params);
      return Promise.resolve(Acciones);
    } catch (error) {
      console.log(error);
      console.log("Error updating action", error);
    }
  }
}
