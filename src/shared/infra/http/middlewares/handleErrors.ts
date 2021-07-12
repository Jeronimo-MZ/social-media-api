import { HttpStatusCode } from "@shared/utils/HttpStatusCode";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

export function handleErrors(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
): Response {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({ status: error.statusCode, error: error.message });
    }

    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error ${error.message}`,
    });
}
