import AuthProvider from "./context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tweeter",
  description:
    "a social media platform built with Next.js, Prisma, tailwindcss and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <footer className="flex justify-center items-center text-gray-300 text-xs p-4 py-5 mt-auto">
          <p>tweet clone create by @rachidelaid</p>
        </footer>
      </body>
    </html>
  );
}
