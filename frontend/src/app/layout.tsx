"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "next/app";
import { ToastProvider } from "@/features/shared/components/toast/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

const token = (localStorage.getItem("authToken"));


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  headers: {
    authorization: token ? token :"sin Token",
    "Content-Type": "application/json",
  },
});
console.log(client);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body>
        <ToastProvider>
          {children}
          </ToastProvider>
          </body>
      </ApolloProvider>
    </html>
  );
}
