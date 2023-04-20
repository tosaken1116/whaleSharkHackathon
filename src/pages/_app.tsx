import { createApolloClient } from "@/libs/createClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import "@babel/polyfill";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    const client = createApolloClient();
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
