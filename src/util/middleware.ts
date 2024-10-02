import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Define tu clave secreta en el archivo .env

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    next();
  });
};
