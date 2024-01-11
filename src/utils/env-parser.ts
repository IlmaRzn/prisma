import z from "zod"

import "dotenv/config.js"


const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.string().transform((port)=> parseInt(port,10)),

});

const env = envSchema.parse(process.env)

export default env;