import {QueryResolvers} from "../../../generated/graphql"

const user: QueryResolvers["user"] = async (_parent, args, ctx) =>{
    try{
        const userInformation = await ctx.prisma.user.findUnique(args)
        return userInformation
    } catch(error){
        console.log(error)
        throw new Error ((error as Error).message)
    }
}
 export default user;