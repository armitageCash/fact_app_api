import "dotenv/config";
import { createApp, UseCaseResult, UsecaseType } from "urunner-lib";
import { Logger } from "@/shared/logger";
import { authData, Input, Output } from "@/cases/auth/types";
import { AuthServiceImpl } from "@/cases/auth/impl";

// Define las dependencias
interface Dependencies {
  logger: Logger;
  authService: AuthServiceImpl;
}

// Define el tipo para el caso de uso de autenticación
type AuthUsecaseType = UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<authData>
>;

// Crea un adaptador
const adapter =
  (fn: AuthUsecaseType) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Define el caso de uso de autenticación
export const auth: AuthUsecaseType = async (
  params: Input,
  dependencies: Dependencies
) => {
  const { logger: log, authService } = dependencies;

  try {
    const response = await authService.auth(params);
    return {
      data: response,
      status: "success",
      message: "Logueado correctamente.",
    };
  } catch (e) {
    console.log("e", e);
    return {
      data: null,
      message: "Usuario no encontrado",
      status: "error",
    };
  }
};

// Crea la instancia del caso de uso
const usecaseAuth = createApp(adapter(auth)).attach(
  (dependencies: Dependencies) => {
    dependencies.logger = new Logger();
    dependencies.authService = new AuthServiceImpl();
  }
);

export default usecaseAuth;
