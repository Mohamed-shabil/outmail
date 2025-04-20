export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    error?: any;

    constructor(message: string, statusCode: number, error?: Error) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}
