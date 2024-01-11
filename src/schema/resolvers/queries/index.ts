import {QueryResolvers} from "../../generated/graphql"

import user from "./user/user"
import users from "./user/users"
import {posts} from "./post/post"

const queries : QueryResolvers ={
    user,
    users,
    posts
}

export default queries;