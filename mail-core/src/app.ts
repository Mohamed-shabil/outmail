import express from "express";
import dotenv from "dotenv";
import { checkEnvVariables } from "./utils/checkEnv.js";
import redisClient from "./lib/redis/index.js";
dotenv.config();
import "./models/index.js";
const app = express();
checkEnvVariables();

redisClient(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on PORT ${PORT}`);
});
