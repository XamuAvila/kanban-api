/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import { UserService } from "../../services/user/user.service";
import { Service, Container } from "typedi";

@Service()
export class UserController {
    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const userService = Container.get(UserService);
            const createdUser = await userService.createUser(req.body);
            res.status(200).send(createdUser);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const userService = Container.get(UserService);
            const user = await userService.login(req.body);
            res.status(200).send(user);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }
}
