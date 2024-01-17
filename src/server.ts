import { YogaInitialContext, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client'

import {typeDefs} from "./schema/type-defs"

import queries from './schema/resolvers/queries';
import mutations from './schema/resolvers/mutations';
import type { Resolvers } from './schema/generated/graphql';
import env from "./utils/env-parser"
import firebase from './services/firebase';



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
const yoga = createYoga({ schema, 
    context:(context)=>({
    prisma,
        currentUser:getCurrentUser(context)}),
});

async function getCurrentUser(context:YogaInitialContext){
    const authorizationHeaderValue = context.request.headers.get("Authorization")
    if(!authorizationHeaderValue){
        return null
    }
    const token = authorizationHeaderValue.split(" ").at(1)

    if(!token) return null

    const decodedToken = await firebase.verifyToken(token)
  const currentUser = await prisma.user.findUnique({
    where:{
        id:decodedToken.uid,
    },
    select:{
        email:true,
        isActive:true,
        id:true
    }
  })
  return currentUser
}

const server = createServer(yoga)
 
server.listen(env.PORT,()=>{
    console.log(`server is running  on http://localhost:${env.PORT}`)
})

export type User = Awaited <ReturnType<typeof getCurrentUser>>