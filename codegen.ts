import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/v1/graphql",
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
            },
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
