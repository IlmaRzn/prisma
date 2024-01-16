import z from "zod"

import "dotenv/config.js"


const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.string().transform((port)=> parseInt(port,10)),
    GOOGLE_APPLICATION_CREDENTIALS: z.string(),
});

const env = envSchema.parse(process.env)

export default env;