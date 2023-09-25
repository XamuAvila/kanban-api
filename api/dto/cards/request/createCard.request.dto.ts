import { Prisma } from "@prisma/client";
import Joi from "joi";
import { BaseError } from "../../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../../shared/constants/httpStatuses.constants";

export class CreateCardRequestDto {
    public titulo: string;
    public conteudo: string;
    public lista: string;

    constructor(params: Prisma.CardCreateInput) {
        this.titulo = params.titulo;
        this.conteudo = params.conteudo;
        this.lista = params.lista;
    }

    static validate(params: Prisma.CardCreateInput): CreateCardRequestDto {
        const cardData = new CreateCardRequestDto(params);
        const cardSchema = Joi.object({
            titulo: Joi.string().required(),
            conteudo: Joi.string().required(),
            lista: Joi.string().required()
        });

        const valid = cardSchema.validate(cardData);

        if (valid?.error) {
            throw new BaseError(valid.error.message, HTTP_STATUSES.BAD_REQUEST);
        }
        return cardData;
    }
}
