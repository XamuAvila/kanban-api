import Container, { Service } from "typedi";
import { UserLoginRequestDto } from "../../dto/user/login/request/userLogin.request.dto";
import { UserLoginResponseDto } from "../../dto/user/login/response/userLogin.response.dto";
import { UserRepository } from "../../repository/user.repository";
import { BaseError } from "../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../shared/constants/httpStatuses.constants";
import { sign } from "jsonwebtoken";
import { auth } from "../../shared/constants/auth.constants";
import { AuthMiddleware } from "../../setup/middlewares/auth.middleware";

@Service()
export class AuthService {
    async auth(user: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        const userRepository = Container.get(UserRepository);
        const validUser = await userRepository.getUserByLogin(user.login);
        const errorMsg = "Invalid user/password";
        if(!validUser){
            throw new BaseError(errorMsg, HTTP_STATUSES.BAD_REQUEST);
        }
        
        const validPassword = await AuthMiddleware.validatePassword(user.senha, validUser.senha);
        
        if(!validPassword){
            throw new BaseError(errorMsg, HTTP_STATUSES.BAD_REQUEST);
        }

        const token = await sign(
            {
                id: validUser.id,
                login: validUser.login,
                senha: validUser.senha
            },
            auth.secret,
            {
                expiresIn: auth.expires
            }
        );

        return new UserLoginResponseDto(token);
    }
}
