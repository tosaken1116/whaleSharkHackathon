import { WebSocketLink } from "@apollo/client/link/ws";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocket } from "ws";
export const createApolloClient = (authToken: string) => {
    return new ApolloClient({
        link: typeof process.browser
            ? new WebSocketLink({
                  uri: "wss://whale-shark.hasura.app/v1/graphql",
                  options: {
                      reconnect: true,
                      connectionParams: {
                          headers: {
                              "x-hasura-admin-secret":
                                  process.env
                                      .NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET,
                              Authorization: `Bearer ${authToken}`,
                          },
                      },
                  },
                  webSocketImpl: WebSocket,
              })
            : undefined,
        cache: new InMemoryCache(),
    });
};
