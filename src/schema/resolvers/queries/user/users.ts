import { createGraphQLError } from "graphql-yoga";
import { QueryResolvers } from "../../../generated/graphql.js";
import { GraphQLError } from "graphql";

const users: QueryResolvers["users"] = async (_parent, _args, ctx) => {
  try {
  if(ctx.currentUser === null ){
    
    throw createGraphQLError("Unauthorized",{
      extensions:{
        code: "UNAUTHORIZED",
        statusCode : 401,
      }
    })
  }


    const usersInformation = await ctx.prisma.user.findMany();
    return usersInformation;
  } catch (error) {

    if(error instanceof GraphQLError){
      throw error
    }

    console.log(error);
    throw new Error((error as Error).message);
    
  }
};

export default users;