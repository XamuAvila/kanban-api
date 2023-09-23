import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction){
        
    }

    static async hashPassword(password: string): Promise<string>{
        const hashed =  await bcrypt.hash(password, 10);
        return hashed;
    }

    static async validatePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
