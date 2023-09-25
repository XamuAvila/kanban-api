/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import { UserService } from "../../services/user/user.service";
import { Service, Container } from "typedi";
import { HTTP_STATUSES } from "../../shared/constants/httpStatuses.constants";

@Service()
export class UserController {
    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const userService = Container.get(UserService);
            const createdUser = await userService.createUser(req.body);
            res.status(HTTP_STATUSES.OK).send(createdUser);
        } catch (error: any) {
            res.status(error?.statusCode ?? HTTP_STATUSES.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const userService = Container.get(UserService);
            const user = await userService.login(req.body);
            res.status(HTTP_STATUSES.OK).json(user.token);
        } catch (error: any) {
            res.status(error?.statusCode ?? HTTP_STATUSES.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
        }
    }
}
