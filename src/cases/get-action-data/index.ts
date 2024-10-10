import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { Input } from "@/cases/get-action-data/types";
import { ActionsServiceImpl } from "@/cases/get-action-data/impl";
import { Acciones } from "@/domain/acciones";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  actionsService: ActionsServiceImpl;
}

// Define el tipo para el caso de uso de obtención de datos de acciones
type GetActionDataUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<Acciones>
>;

// Crea un adaptador
const adapter =
  (fn: GetActionDataUsecaseType): GetActionDataUsecaseType =>
  async (input: Input, dependencies: Dependencies) => {
    const { logger: log } = dependencies;

    try {
      const response = await fn(input, dependencies);
      return {
        data: response.data,
        status: "success",
        message: "Ok",
      };
    } catch (error: any) {
      log.error(error);
      return {
        data: null,
        status: "error",
        message: "Error obteniendo la información de las acciones.",
      };
    }
  };

// Define el caso de uso de obtención de datos de acciones
export const getActionsData: GetActionDataUsecaseType = async (
  params: Input,
  dependencies: Dependencies
): Promise<UseCaseResult<Acciones>> => {
  const { logger: log, actionsService } = dependencies;

  try {
    const response = await actionsService.getAction(params);
    return {
      data: response || null,
      status: "success",
      message: "Ok",
    };
  } catch (error: any) {
    log.error(error);
    return {
      data: null,
      status: "error",
      message: "Error obteniendo la información de las acciones.",
    };
  }
};

// Crea la instancia del caso de uso
const usecaseGetActionDataBiNit = createApp(adapter(getActionsData)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.actionsService = new ActionsServiceImpl();
  }
);

export default usecaseGetActionDataBiNit;
