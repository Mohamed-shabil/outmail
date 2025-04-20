import express from "express";
import dotenv from "dotenv";
import { checkEnvVariables } from "./utils/checkEnv.js";
dotenv.config();
const app = express();
import "./models/index.js";
checkEnvVariables();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on PORT ${PORT}`);
});
