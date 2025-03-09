import { Request, Response } from "express";
import { AuthRequest } from "../custom-types.js";
import prisma from "../config/db.config.js";

class ChatGroupController {

    static async index(req: AuthRequest, res: Response) {
       try {
        const user = req.user;
        const chatGroups = await prisma.chatGroup.findMany({
            where: {
                user_id: user.id
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        return res.status(200).json({
            message: "Chat groups fetched successfully",
            chatGroups
        })
       } catch (error) {
        res.status(500).json({
            message: "Something went wrong, Please try again later..",
            error: error.message
        });
       }
    }

    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log("id", id);
            const chatGroup = await prisma.chatGroup.findUnique({
                where: { id: id }
            });
            if (!chatGroup) {
                return res.status(404).json({
                    message: "Chat group not found"
                });
            }
            return res.status(200).json({
                message: "Chat group fetched successfully",
                chatGroup
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong, Please try again later..",
                error: error.message
            });
        }
    }
    static async store(req: AuthRequest, res: Response) {
        try {
            const { title, passcode } = req.body;
            
           
            if (!title || !passcode) {
                return res.status(400).json({
                    message: "Title and passcode are required"
                });
            }

            // Ensure user exists and has an ID
            if (!req.user || !req.user.id) {
                return res.status(401).json({
                    message: "User not authenticated properly"
                });
            }

            const userId = req.user.id;
            console.log('Creating chat group for user ID:', userId);

            const chatGroup = await prisma.chatGroup.create({
                data: {
                    title,
                    passcode,
                    user_id: userId
                }
            });

            return res.status(201).json({
                message: "Chat group created successfully",
                chatGroup
            });
        } catch (error) {
            console.error('Error creating chat group:', error);
            return res.status(500).json({
                message: "Something went wrong, Please try again later..",
                error: error.message
            });
        }
    }

    static async update(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const { title, passcode } = req.body;
            const chatGroup = await prisma.chatGroup.update({
            where: { id: id },
            data: { title, passcode }
        });
        return res.status(200).json({
                message: "Chat group updated successfully",
                chatGroup
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong, Please try again later..",
                error: error.message
            });
        }
    }

    static async destroy(req: AuthRequest, res: Response) {
        try {
            const { id } = req.params;
            const chatGroup = await prisma.chatGroup.delete({
                where: { id: id }
            });
            return res.status(200).json({
                message: "Chat group deleted successfully",
                chatGroup
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong, Please try again later..",
                error: error.message
            });
        }
    }
}

export default ChatGroupController;
