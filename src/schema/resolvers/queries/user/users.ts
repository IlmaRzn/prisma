import { QueryResolvers } from "../../../generated/graphql.js";

const users: QueryResolvers["users"] = async (_parent, _args, ctx) => {
  try {
    const usersInformation = await ctx.prisma.user.findMany();
    return usersInformation;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export default users;