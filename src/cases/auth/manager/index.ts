import { authData, Input } from "@/cases/auth/types";

export default interface authServiceManager {
  auth(params: Input): Promise<authData | undefined>;
}
