import { Response, Request } from "express";
import { UsuarioEntity } from "../../entities/usuario.entity";
import { UserService } from "../../services/user/user.service";
import { Service, Container } from "typedi";

@Service()
export class UserController {
    async signUp(req: Request, res: Response) {
        try {
            const userService = Container.get(UserService);
            const usuario: UsuarioEntity = UsuarioEntity.validateEntity(req.body);
            const createdUser = await userService.createUser(usuario);
            res.status(200).send(createdUser);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }
}
