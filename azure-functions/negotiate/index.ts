import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  _: HttpRequest,
  connectionInfo: any
): Promise<void> {
  context.res.body = connectionInfo;
};

export default httpTrigger;
