import { Application } from "express";
import { Redis, RedisOptions } from "ioredis";

let redis: Redis | null = null;
let retryCount = 0;
const maxRetries = 5;

const initialiseRedis = (app: Application) => {
    if (!redis) {
        const redisOptions: RedisOptions = {
            retryStrategy: (times: number): number | null => {
                retryCount++;
                if (retryCount > maxRetries) {
                    console.error(
                        `🚨 Max retry attempt (${maxRetries}) reached. not reconnecting.`
                    );
                    return null;
                }
                console.warn(
                    `⏳ Retrying redis connection (attempt ${retryCount}/${maxRetries})...`
                );

                return Math.min(times * 100, 2000);
            },
            reconnectOnError: (err: Error): boolean => {
                console.error(`🚨 Reconnecting redis on error`, err);
                return true;
            },
        };
        redis = new Redis(process.env.REDIS_URL || "", redisOptions);

        redis.on("connect", () => {
            console.log(`✅ Redis connected successfully`);
            app.locals.redis = redis;
        });

        redis.on("error", (err: Error) => {
            console.log(`🚨 Redis connection error\n`, {
                message: err.message,
            });
        });

        redis.on("close", () => {
            console.log(`✅ Redis connection closed`);
        });
    }
};

export default initialiseRedis;
