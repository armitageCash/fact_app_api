import { Input } from "@/cases/auth/types";
import Repository from "@/shared/repository";
import { User } from "@/domain/users";

export default class AuthRepository extends Repository {
  constructor() {
    super();
  }

  async findUser(input: Input): Promise<User | undefined> {
    return this.database
      .instance<User>("Users") // Especifique el nombre de la tabla aquí
      .where(input)
      .first();
  }
}
