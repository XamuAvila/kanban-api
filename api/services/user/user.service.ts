import { Service, Container } from "typedi";
import { BaseError } from "../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../shared/constants/httpStatuses.constants";
import { UserRepository } from "../../repository/user.repository";
import { UserLoginRequestDto } from "../../dto/user/login/request/userLogin.request.dto";
import { UserSignupRequestDto } from "../../dto/user/signup/request/userSignup.request.dto";
import { Usuario } from "@prisma/client";
import { UserLoginResponseDto } from "../../dto/user/login/response/userLogin.response.dto";
import { AuthService } from "../auth/auth.service";

@Service()
export class UserService {
    async createUser(body: UserSignupRequestDto): Promise<Usuario> {
        try {
            const userRepository = Container.get(UserRepository);
            const usuario: UserSignupRequestDto = UserSignupRequestDto.validateEntity(body);
            const createdUser = await userRepository.createUser(usuario);
            return createdUser;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new BaseError("Error while creating user, please contact support team", HTTP_STATUSES.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body:UserLoginRequestDto): Promise<UserLoginResponseDto> {
        const authService = Container.get(AuthService);
        const token = await authService.auth(body);
        return token;
    }
}
