import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";

export function handleErrors(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
) {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({ status: error.statusCode, error: error.message });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal Server Error ${error.message}`,
    });
}
