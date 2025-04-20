import { Request, Response, NextFunction } from "express";
import { IUserType, PublicUser } from "../types/user.types.js";
import bcrypt, { hash } from "bcryptjs";
import { User } from "../models/User.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

console.log(JWT_EXPIRES_IN);

const signToken = (id: number) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
};

const createSendToken = (
    user: PublicUser,
    statusCode: number,
    res: Response
) => {
    const token = signToken(user.id);
    const cookiesOptions = {
        expires: new Date(
            Date.now() +
                parseInt(process.env.JWT_COOKIE_EXPIRES_IN!, 10) *
                    24 *
                    60 *
                    60 *
                    1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    user.password = undefined;

    res.cookie("auth_token", token, cookiesOptions);

    return res.status(statusCode).json({
        success: true,
        message: "user authenticated successfully",
        token,
    });
};

const signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, name, password } = req.body;

        // Check user is already exist in db or not
        const isUserExist = await User.findOne({ where: { email } });

        if (isUserExist) {
            // if use already exist return bad req err
            return next(
                new AppError("User with this email already exist", 400)
            );
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store the user in the db
        const user = await User.create({
            name: name.lowercase(),
            email: email,
            password: hashedPassword,
            role: "user",
            verified: false,
            authProvider: "cred",
        });

        return createSendToken(user, 201, res);
    }
);
