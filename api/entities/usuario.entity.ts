import { Prisma } from ".prisma/client";
import Joi from "joi";
import { BaseError } from "../errors/baseError";
import { HTTP_STATUSES } from "../constants/httpStatuses.constants";

export class UsuarioEntity implements Prisma.UsuarioCreateInput {
    constructor(usuario: Prisma.UsuarioCreateInput){
        this.email = usuario.email;
        this.login = usuario.login;
        this.senha = usuario.senha;
    }
    email: string;
    login: string;
    senha: string;

    static validateEntity(usuario: Prisma.UsuarioCreateInput): UsuarioEntity{
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            login: Joi.string().max(200).required(),
            senha: Joi.string().min(6).required()
        });
        const valid = userSchema.validate(usuario);

        if(valid?.error){
            throw new BaseError(valid.error.message, HTTP_STATUSES.BAD_REQUEST);
        }

        return new UsuarioEntity(usuario);
    }
}
