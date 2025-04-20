import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
const DB_NAME = process.env.DB_NAME!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = process.env.DB_PORT!;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    port: parseInt(DB_PORT, 10),
    pool: {
        max: 10,
        min: 0,
        acquire: 100000,
        idle: 10000,
    },
});

try {
    await sequelize.authenticate();
    console.log("✅ DB Connected Successfully...");
} catch (error) {
    console.error("🚨 Error in connecting DB \n", error);
}
