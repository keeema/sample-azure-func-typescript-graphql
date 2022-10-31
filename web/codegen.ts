/* eslint-disable */
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:7071/api/graphql",
  documents: "src/api/graphql/operations.gql",
  generates: {
    "src/api/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        {
          add: {
            content: "/* prettier-disable */",
          },
        },
      ],
      config: {
        exposeQueryKeys: true,
        fetcher: {
          endpoint: '"/api/graphql"',
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
