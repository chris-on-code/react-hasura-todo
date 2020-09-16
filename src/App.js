import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import "./App.css";
import Todos from "./components/Todos";
import OnlineUsers from "./components/OnlineUsers";

const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://flying-camel-99.hasura.app/v1/graphql",
      options: {
        reconnect: true,
      },
    }),
    cache: new InMemoryCache(),
  });
};

// todo
// 1. let users add their name (mutation to create user)
// 2. let users click on a side (mutation to update quantity)

export default function App() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="z-10 fixed top-0 inset-x-0 mt-4">
        <OnlineUsers />
      </div>

      <div className="relative min-h-screen flex">
        {/* tug o war dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-green-400 rounded-full shadow-xl"></div>
        </div>

        {/* columns */}
        <div className="w-1/2 bg-blue-500 text-blue-400 text-xs flex items-center justify-center">
          blue team
        </div>
        <div className="w-1/2 bg-red-500 text-red-400 text-xs flex items-center justify-center">
          red team
        </div>
      </div>
      <Todos />
    </ApolloProvider>
  );
}
