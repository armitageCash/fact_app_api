"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(secretKey, tokenExpiry = "1d", saltLength = 16) {
        this.secretKey = secretKey;
        this.tokenExpiry = tokenExpiry;
        this.saltLength = saltLength; // Default salt length is 16 bytes
    }
    // Method to hash the password using crypto
    hashPassword(password) {
        const salt = crypto_1.default.randomBytes(this.saltLength).toString("hex");
        const hashedPassword = crypto_1.default
            .pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex");
        return `${salt}:${hashedPassword}`;
    }
    // Method to verify the password using crypto
    verifyPassword(password, storedPassword) {
        const [salt, hashedPassword] = storedPassword.split(":");
        const hash = crypto_1.default
            .pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex");
        return hashedPassword === hash;
    }
    // Method to generate JWT
    generateToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, this.secretKey, {
            expiresIn: this.tokenExpiry,
        });
        return token;
    }
    // Method to verify JWT
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            return decoded;
        }
        catch (err) {
            console.error("Token verification failed:", err);
            return null;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=jwt.js.map