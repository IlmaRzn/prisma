import {QueryResolvers} from "../../../generated/graphql"

const posts: QueryResolvers ["posts"] = async (_parent, _args, ctx) =>{
    try{
        const postsInformation = await ctx.prisma.post.findMany();
        return postsInformation;
    }catch (error){
        console.log(error)
        throw new Error ((error as Error).message)
    }
}

export {posts}