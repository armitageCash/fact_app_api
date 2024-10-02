import crypto from "crypto";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  username: string;
}

export class AuthService {
  private secretKey: string;
  private tokenExpiry: string;
  private saltLength: number;

  constructor(secretKey: string, tokenExpiry = "1h", saltLength = 16) {
    this.secretKey = secretKey;
    this.tokenExpiry = tokenExpiry;
    this.saltLength = saltLength; // Default salt length is 16 bytes
  }

  // Method to hash the password using crypto
  hashPassword(password: string): string {
    const salt = crypto.randomBytes(this.saltLength).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return `${salt}:${hashedPassword}`;
  }

  // Method to verify the password using crypto
  verifyPassword(password: string, storedPassword: string): boolean {
    const [salt, hashedPassword] = storedPassword.split(":");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hashedPassword === hash;
  }

  // Method to generate JWT
  generateToken(payload: TokenPayload): string {
    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: this.tokenExpiry,
    });
    return token;
  }

  // Method to verify JWT
  verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
      return decoded;
    } catch (err) {
      console.error("Token verification failed:", err);
      return null;
    }
  }
}
