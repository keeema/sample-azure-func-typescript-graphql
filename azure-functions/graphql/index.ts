import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./model/todo/task.resolver";
import { mongooseFactory } from "./utils/database/mongooseFactory";

const mongooseSingleton = mongooseFactory();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await mongooseSingleton;

  const schema = await buildSchema({
    resolvers: [TaskResolver],
  });

  const result = await graphql({
    schema,
    source: req.body.query,
    variableValues: req.body.variables,
  });

  context.res = {
    status: 200,
    body: result,
    headers: { "content-type": "application/json" },
  };
};

export default httpTrigger;
