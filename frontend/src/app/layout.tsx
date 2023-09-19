"use client";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/features/shared/components/toast/ToastProvider";
import { RouterLayout } from "@/features/shared/components/navBar/RouterLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageValue } from "@/auth/services/session.service";

const inter = Inter({ subsets: ["latin"] });





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hideBar = ["/pages/login", "/pages/register", "/pages/forgotPassword"];

  
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: ""+getLocalStorageValue("token"),
      "Content-Type": "application/json",
    },
  });
  
  const errorLink = new ApolloLink((operation, forward) => {
    forward(operation).subscribe({
      next: (data: any) => {},
      error: (err: any) => {
        if (err.response.status === 401) {
         // localStorage.removeItem("token");
          window.location.href = "login";
        }
      },
    });
    return forward(operation).map((response) => {
      return response;
    });
  });
  
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink,httpLink ]),
    cache: new InMemoryCache(),
  });
 
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <body>
          {!hideBar && <RouterLayout>{children}</RouterLayout>}
          <ToastProvider>{children}</ToastProvider>
        </body>
      </ApolloProvider>
    </html>
  );
}
