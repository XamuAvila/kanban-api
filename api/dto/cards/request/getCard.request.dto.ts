import Joi from "joi";
import { Request } from "express";
import { BaseError } from "../../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../../shared/constants/httpStatuses.constants";

export class GetCardRequestDto {
    public id:string;
    constructor(params: {id:string}){
        this.id = params.id;
    }

    static validate(req: Request): GetCardRequestDto {
        const getCardSchema = Joi.object({
            id: Joi.string().required().uuid()
        });

        const valid = getCardSchema.validate(req.params);

        if(valid?.error){
            throw new BaseError(valid.error.message, HTTP_STATUSES.BAD_REQUEST);
        }

        return new GetCardRequestDto(req.params as {id: string});
    }
}
