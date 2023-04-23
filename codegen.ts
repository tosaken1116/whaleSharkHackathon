import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        "https://whale-shark.hasura.app/v1/graphql": {
            headers: {
                "x-hasura-admin-secret": String(
                    process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET
                ),
            },
        },
    },
    documents: "src/graphql/**/*.graphql",
    generates: {
        "src/generates/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                withHooks: true,
                withComponent: false,
                scalars: {
                    timestamptz: "string",
                    uuid: "string",
                },
            },
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
