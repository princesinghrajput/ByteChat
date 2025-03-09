import { Request } from 'express';

export interface AuthUser {
    id: number;
    email: string;
    name: string;
    oauth_id: string;
}

export interface AuthRequest extends Request {
    user: AuthUser;
}

declare namespace Express {
    export interface Request {
        user?: AuthUser;
    }
}
