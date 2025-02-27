import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Black",
  description: "Daniel Black's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <main className="mx-auto w-full max-w-2xl py-10">
          <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Daniel Black
            </h1>
            <Header />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
