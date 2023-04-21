import { createApolloClient } from "@/libs/createClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import "@babel/polyfill";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
    const client = createApolloClient();
    return (
        <RecoilRoot>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </RecoilRoot>
    );
}
