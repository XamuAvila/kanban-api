// import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../../shared/constants/httpStatuses.constants";
import { auth } from "../../shared/constants/auth.constants";

export class AuthMiddleware {
    // static authenticate(req: Request, res: Response, next: NextFunction){

    // }

    static async hashPassword(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 10);
        return hashed;
    }

    static async validatePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    static async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = String(req.headers.authorization).split(" ")[1];

            if (!token) {
                res.status(HTTP_STATUSES.BAD_REQUEST).send({
                    message: "No token found"
                });
                return;
            }
            
            req.body.user = verify(String(token), auth.secret);

            next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            res.status(HTTP_STATUSES.UNAUTHORIZED).send({
                message: "Invalid token"
            });
        }
    }
}
