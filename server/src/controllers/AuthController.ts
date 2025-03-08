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
        const { email, password } = req.body;

        try{
            const body: LoginPayloadBody = req.body;

            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if(!findUser){
                return res.status(404).json({
                    message: "User not found",
                });
            }

            let JWTPayload = {
                name: findUser.name,
                email: findUser.email,
                oauth_id: findUser.oauth_id,
            }

            let token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });

            return res.status(200).json({
                message: "Login successfully",
               user:{
                ...findUser,
                token: token,
               },
            });

        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Something went wrong. Please try again later.",
            });
        }
    }
}

export default AuthController;