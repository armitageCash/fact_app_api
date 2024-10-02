import "dotenv/config";
import { App } from "@/runtime";
import { Logger } from "@/shared/logger";
import { authCaseType, Input, Output } from "@/cases/auth/types";
import { AuthServiceImpl } from "@/cases/auth/impl";
import { usecaseResult } from "@/shared/cases";

const adapterAuth =
  (fn: authCaseType<usecaseResult>) =>
  async (params: Input, dependencies: any) => {
    return await fn(params, dependencies);
  };

export const auth: authCaseType<usecaseResult> = async (
  params: Input,
  dependencies: any
) => {
  const { logger: log, authService } = dependencies;

  try {
    const response = await authService.auth(params);
    log.info(response);
    return {
      data: response,
      status: "success",
      message: "Logueado correctamente.",
    };
  } catch (e) {
    const caseResult: usecaseResult = {
      data: null,
      message: "Usuario no encontrado",
      status: "error",
    };
    return caseResult;
  }
};

const usecaseAuth = App(adapterAuth(auth)).attach((dependencies) => {
  dependencies.logger = new Logger();
  dependencies.authService = new AuthServiceImpl();
});

export default usecaseAuth;
