import { Container } from "typedi";
import { UserController } from "../controllers/user/user.controller";
import { UserService } from "../services/user/user.service";
import { UserRepository } from "../repository/user.repository";

export class DependencyInjection {
    static startup = () => {
        Container.set("userService", UserService);
        Container.set("userController", UserController);
        Container.set("userRepository", UserRepository);
    };
}
