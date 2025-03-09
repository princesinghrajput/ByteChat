import { Request, Response } from "express";
import { AuthRequest } from "../custom-types.js";
import prisma from "../config/db.config.js";

class ChatGroupController {
    static async store(req: AuthRequest, res: Response) {
        try {
            const body = req.body;
            const user = req.user; 
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                }
            })
            return res.status(201).json({message: "Chat group created successfully", chatGroup});
        } catch (error) {
            return res.status(500).json({message: "Something went wrong, Please try again later.."});
        }
    }
}

export default ChatGroupController;