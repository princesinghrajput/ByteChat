import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, AuthUser } from "../custom-types.js";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: "No authorization header" });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        // Assign the decoded user to the request
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ 
            message: "Authentication failed",
            error: error.message 
        });
    }
}

export default authMiddleware;
