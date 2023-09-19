"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/features/shared/components/toast/ToastProvider";
import { RouterLayout } from "@/features/shared/components/navBar/RouterLayout";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const token = localStorage.getItem("authToken");

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  headers: {
    authorization: token ? token : "sin Token",
    "Content-Type": "application/json",
  },
});
console.log(client);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hideBar = ["/pages/login", "/pages/register", "/pages/forgotPassword"];

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
