import Joi from "joi";
import { BaseError } from "../../../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../../../shared/constants/httpStatuses.constants";
export class UserLoginResponseDto {
    public token!: string;
    constructor(token: string){
        this.token = token;
        return this.validate();
    }

    validate(){
        const schema = Joi.object({
            token: Joi.string().required()
        });

        const valid = schema.validate({
            token: this.token
        });

        if(valid?.error){
            throw new BaseError("Invalid token", HTTP_STATUSES.INTERNAL_SERVER_ERROR);
        }

        return this;
    }
}
