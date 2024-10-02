import authServiceManager from "@/cases/auth/manager";
import { authData, Input } from "@/cases/auth/types";
import AuthController from "@/controllers/authController";

export class AuthServiceImpl implements authServiceManager {
  async auth(params: Input): Promise<authData> {
    return new AuthController().login(params);
  }
}
