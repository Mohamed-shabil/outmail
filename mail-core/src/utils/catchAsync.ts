import { Request, Response, NextFunction } from "express";

type AsyncMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export const catchAsync = (fn: AsyncMiddleware) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
