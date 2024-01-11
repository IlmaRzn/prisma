import {MutationResolvers} from "../../generated/graphql"

import createUser from "./user/create-user"

const mutations: MutationResolvers ={
    createUser,
}

export default mutations;