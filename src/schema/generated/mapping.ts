import { type YogaInitialContext } from "graphql-yoga";

import { type PrismaClient } from "@prisma/client";
import { User } from "../../server";

interface Context extends YogaInitialContext {
  prisma: PrismaClient;
  currentUser:User
}

export type { User, Post } from "@prisma/client";
export { Context };
