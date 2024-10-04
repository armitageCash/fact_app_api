"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Define tu clave secreta en el archivo .env
const authenticateToken = (req, res, next) => {
    console.log("req", req.path);
    if (req.path === "/login") {
        return next();
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // El formato debe ser "Bearer token"
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied, no token provided" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=middleware.js.map