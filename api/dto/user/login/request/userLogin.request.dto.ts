import { Prisma } from "prisma/prisma-client";
import Joi from "joi";
import { HTTP_STATUSES } from "../../../../shared/constants/httpStatuses.constants";
import { BaseError } from "../../../../shared/errors/baseError";
export class UserLoginRequestDto {
    constructor(usuario: Prisma.UsuarioCreateInput) {
        this.login = usuario.login;
        this.senha = usuario.senha;
    }
    login: string;
    senha: string;

    static validate(usuario: Prisma.UsuarioCreateInput): UserLoginRequestDto {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            login: Joi.string().max(200).required(),
            senha: Joi.string().min(6).required()
        });
        const valid = userSchema.validate(usuario);

        if (valid?.error) {
            throw new BaseError(valid.error.message, HTTP_STATUSES.BAD_REQUEST);
        }

        return new UserLoginRequestDto(usuario);
    }
}
