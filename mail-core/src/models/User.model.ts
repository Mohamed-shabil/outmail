import { DataTypes } from "sequelize";
import { UserInstance } from "../types/user.types.js";
import { sequelize } from "./index.js";

export const User = sequelize.define<UserInstance>("User", {
    id: {
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
    },
    name: {
        type: DataTypes.TEXT,
    },
    email: {
        type: DataTypes.TEXT,
    },
    verified: {
        type: DataTypes.BOOLEAN,
    },
    password: {
        type: DataTypes.TEXT,
    },
    authProvider: {
        type: DataTypes.ENUM("cred", "google"),
        defaultValue: "cred",
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
    },
});
