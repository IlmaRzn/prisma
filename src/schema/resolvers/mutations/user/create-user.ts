import { createGraphQLError } from "graphql-yoga";

import {MutationResolvers} from "../../../generated/graphql"

import {userCreateSchema} from "./utils"

const createUser: MutationResolvers["createUser"] = async(
    _parent,
    args,
    ctx,
) =>{
    try{
      
        const data = userCreateSchema.parse(args.data)
        const userInformation = await ctx.prisma.user.create({data})
        return userInformation;
    } catch (error){
        console.log(error)
        throw createGraphQLError("something went wrong")
    }
}

export default createUser