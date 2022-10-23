import { AzureFunction, Context } from "@azure/functions";

const httpTrigger: AzureFunction = function (context: Context): void {
  context.log("HTTP trigger function processed a request.");

  context.res = {
    status: 200,
    body,
    headers: {
      "Content-Type": "text/html",
    },
  };

  context.done();
};

const body = `
<html>
  <head>
    <title>Simple GraphiQL Example</title>
    <link href="https://unpkg.com/graphiql/graphiql.min.css" rel="stylesheet" />
  </head>
  <body style="margin: 0;">
    <div id="graphiql" style="height: 100vh;"></div>

    <script
      crossorigin
      src="https://unpkg.com/react/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/graphiql/graphiql.min.js"
    ></script>

    <script>
      const fetcher = GraphiQL.createFetcher({ 
        url: '/api/graphql',
       });

      ReactDOM.render(
        React.createElement(GraphiQL, { 
          fetcher: fetcher,
        }),
        document.getElementById('graphiql'),
      );
    </script>
  </body>
</html>`;

export default httpTrigger;
