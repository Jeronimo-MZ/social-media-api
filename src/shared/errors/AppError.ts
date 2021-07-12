import { HttpStatusCode } from "@shared/utils/HttpStatusCode";

class AppError {
    public readonly statusCode: HttpStatusCode;
    public readonly message: string;

    constructor(message: string, statusCode = HttpStatusCode.BAD_REQUEST) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { AppError };
