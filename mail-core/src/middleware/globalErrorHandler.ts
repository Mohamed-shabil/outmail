import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";

const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isKnownError = err instanceof AppError;
    const statusCode = isKnownError ? err.statusCode : 500;
    const message = err.message || "Something went wrong";
    const errors = isKnownError && err.error ? err.error : undefined;

    console.error(`[ERROR] ${req.method} ${req.path}`);
    console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;
