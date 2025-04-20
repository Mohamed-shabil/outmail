import { Optional, Model } from "sequelize";

export interface IUserType {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    password: string;
    authProvider: "google" | "cred";
    role: "admin" | "user";
}

export interface UserCreationAttributes extends Optional<IUserType, "id"> {}

export interface UserInstance
    extends Model<IUserType, UserCreationAttributes>,
        IUserType {
    createdAt?: Date;
    updatedAt?: Date;
}

export type PublicUser = Omit<IUserType, "password"> &
    Partial<Pick<IUserType, "password">>;
