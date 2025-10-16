import type { Request } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";

import { env } from "@/common/utils/envConfig";

const rateLimiter = rateLimit({
	legacyHeaders: true,
	limit: env.isDevelopment ? 10000 : env.COMMON_RATE_LIMIT_MAX_REQUESTS, // Much higher limit in development
	message: "Too many requests, please try again later.",
	standardHeaders: true,
	windowMs: env.isDevelopment ? 60 * 1000 : 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS, // 1 minute window in development vs 15 minutes in production
	keyGenerator: (req: Request) => ipKeyGenerator(req.ip  as string),
});

export default rateLimiter;
