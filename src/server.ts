import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client'

import {typeDefs} from "./schema/type-defs"

import queries from './schema/resolvers/queries';
import mutations from './schema/resolvers/mutations';
import type { Resolvers } from './schema/generated/graphql';
import env from "./utils/env-parser"



const prisma = new PrismaClient();

const resolvers :Resolvers={
    Query: queries,
    Mutation: mutations,
    User:{
        async posts(user, _args, ctx){
            try {
                const postInformation = await ctx.prisma.post.findMany({
                    where:{
                        authorId:user.id,
                    }
                })
                return postInformation

            } catch (error){
                throw new Error("something went wrong")
            }
        }
    }
}

const schema = createSchema({typeDefs, resolvers})
const yoga = createYoga({ schema, context:{prisma}})
const server = createServer(yoga)
 
server.listen(env.PORT,()=>{
    console.log(`server is running  on http://localhost:${env.PORT}`)
})