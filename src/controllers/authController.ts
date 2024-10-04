import { authData, Input } from "@/cases/auth/types";
import AuthRepository from "@/repositories/auth";
import { AuthService } from "@/services/jwt";

export default class AuthController {
  authRepository: AuthRepository;
  authService: AuthService;

  constructor() {
    this.authRepository = new AuthRepository();
    this.authService = new AuthService(process.env.JWT_SECRET || "pwd");
  }

  async login(params: Input): Promise<authData> {
    const user = await this.authRepository.findUser(params);

    if (user) {
      const jwt = this.authService.generateToken({
        id: user.Idusuario,
        username: user.Nombre!,
      });
      return Promise.resolve({ user, jwt });
    }

    return Promise.reject("User not found");
  }
}
