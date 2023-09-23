export class BaseError{
    constructor(message: string, statusCode: number){
        this.message = message;
        this.statusCode = statusCode;
    }
    public message: string;
    public statusCode: number;
}

export interface IBaseError {
    message: string;
    statusCode: number;
}
