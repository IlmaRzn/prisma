import {z} from "zod"

const userCreateSchema = z.object({
    name: z.string().trim().min(3,{message:"name is required"}),
    address: z.string().trim().min(3,{message:"address is required"}),
    isActive: z.boolean().optional(),
    gender: z.enum(["Male","Female"]),
    email:z.string().email(),
});

export{userCreateSchema}