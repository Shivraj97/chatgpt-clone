import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexProvider from "../providers/conve-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talk GPT",
  description: "Chat with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexProvider>{children}</ConvexProvider>
      </body>
    </html>
  );
}
