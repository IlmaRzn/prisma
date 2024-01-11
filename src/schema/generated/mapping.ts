import { type YogaInitialContext } from "graphql-yoga";

import { type PrismaClient } from "@prisma/client";

interface Context extends YogaInitialContext {
  prisma: PrismaClient;
}

export type { User, Post } from "@prisma/client";
export { Context };
