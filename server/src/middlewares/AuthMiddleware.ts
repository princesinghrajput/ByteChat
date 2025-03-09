import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, AuthUser } from "../custom-types.js";

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token === null || token === undefined) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as AuthUser;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

export default authMiddleware;
