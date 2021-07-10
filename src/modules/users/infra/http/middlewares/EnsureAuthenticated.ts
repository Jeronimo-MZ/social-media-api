import { NextFunction, Request, Response } from "express";
import { JwtTokenProvider } from "@modules/users/providers/TokenProvider/implementations/JwtTokenProvider";
import { ITokenProvider } from "@modules/users/providers/TokenProvider/models/ITokenProvider";
import { AppError } from "@shared/errors/AppError";

export default function ensureAuthenticated(
    request: Request,
    _response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Authorization token is missing", 401);
    }

    const [, token] = authHeader.split(" ");
    const tokenProvider: ITokenProvider = new JwtTokenProvider();

    try {
        const user_id = tokenProvider.getDataOrFail(token);
        request.body.user_id = user_id;
        return next();
    } catch (error) {
        throw new AppError("Invalid Authorization token", 401);
    }
}
