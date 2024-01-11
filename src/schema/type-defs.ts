import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const schemaPath = resolve(__dirname, "./schema.graphql");
const typeDefs = readFileSync(schemaPath, "utf-8");

export { typeDefs };
