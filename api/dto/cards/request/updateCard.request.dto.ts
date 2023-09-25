import Joi from "joi";
import { BaseError } from "../../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../../shared/constants/httpStatuses.constants";

interface IUpdateCardRequest {
    titulo?: string;
    conteudo?: string;
    lista?: string;
    id: string;
}
export class UpdateCardRequestDto {
    public titulo?: string;
    public conteudo?: string;
    public lista?: string;
    public id: string;

    constructor(params: IUpdateCardRequest) {
        this.titulo = params?.titulo;
        this.conteudo = params?.conteudo;
        this.lista = params?.lista;
        this.id = params?.id;
    }

    static validate(params: IUpdateCardRequest): UpdateCardRequestDto {

        const cardData = new UpdateCardRequestDto(params);

        const cardSchema = Joi.object({
            titulo: Joi.string(),
            conteudo: Joi.string(),
            lista: Joi.string(),
            id: Joi.string().required()
        });

        const valid = cardSchema.validate(cardData);

        if (valid?.error) {
            throw new BaseError(valid.error.message, HTTP_STATUSES.BAD_REQUEST);
        }
        return cardData;
    }
}
