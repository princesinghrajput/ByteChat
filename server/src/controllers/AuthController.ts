import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
interface LoginPayloadBody {
    name: string;
    email: string;
    password: string;
    provider: string;
    image?: string;
    oauth_id: string;
}

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            console.log('Login request received:', req.body);
            const body: LoginPayloadBody = req.body;
            
            if (!body.email || !body.oauth_id) {
                console.log('Missing required fields');
                return res.status(400).json({
                    message: "Email and oauth_id are required"
                });
            }

            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            // If user doesn't exist, create them
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: {
                        email: body.email,
                        name: body.name,
                        provider: body.provider,
                        image: body.image,
                        oauth_id: body.oauth_id
                    }
                });
            }

            const JWTPayload = {
                id: findUser.id,
                name: findUser.name || '',
                email: findUser.email,
                oauth_id: findUser.oauth_id
            };

            console.log('Creating JWT with payload:', JWTPayload); // Add this for debugging

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
                expiresIn: "365d",
            });

            return res.status(200).json({
                message: "Login successful",
                user: {
                    ...findUser,
                    token: token,
                },
            });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "Something went wrong. Please try again later.",
                error: error.message
            });
        }
    }
}

export default AuthController;