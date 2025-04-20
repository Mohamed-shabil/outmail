const envVariable = [
    "PORT",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "DB_HOST",
    "DB_PORT",
];

export function checkEnvVariables() {
    const missing = envVariable.filter((key) => !process.env[key]);
    if (missing.length) {
        console.error(
            `🚨 Missing required environment variables: ${missing.join(", ")}`
        );
        process.exit(1);
    } else {
        console.log(`✅ All required environment variables are set!`);
    }
}
