import Layout from "@/components/Layout";
import { createApolloClient } from "@/libs/createClient";
import { createMuiTheme } from "@/libs/theme";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import "@babel/polyfill";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
    const client = createApolloClient();
    const theme = createMuiTheme();
    return (
        <RecoilRoot>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ApolloProvider>
        </RecoilRoot>
    );
}
