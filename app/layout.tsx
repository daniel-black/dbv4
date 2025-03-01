import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsoleEasterEgg } from "@/components/console-easter-egg";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    <html
      lang="en"
      className="light"
      style={{
        scrollBehavior: "smooth",
        colorScheme: "light",
      }}
    >
      {process.env.NODE_ENV === "production" ? (
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
        />
      ) : null}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <main>
            <div className="space-y-4 mb-8">
              <Header />
            </div>
            <div className="mb-14 mt-0 sm:mb-0 sm:mt-14">{children}</div>
          </main>
        </ThemeProvider>
        <ConsoleEasterEgg />
      </body>
    </html>
  );
}
