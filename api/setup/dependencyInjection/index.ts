import { Container } from "typedi";
import { UserController } from "../../controllers/user/user.controller";
import { UserService } from "../../services/user/user.service";
import { UserRepository } from "../../repository/user.repository";
import { AuthService } from "../../services/auth/auth.service";
import { CardController } from "../../controllers/card/card.controller";
import { CardService } from "../../services/card/card.service";

export class DependencyInjection {
    static startup = () => {
        Container.set("userService", UserService);
        Container.set("userController", UserController);
        Container.set("userRepository", UserRepository);

        Container.set("cardController", CardController);
        Container.set("cardService", CardService);

        Container.set("authService", AuthService);
    };
}
