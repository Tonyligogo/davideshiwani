import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex";
import { Toaster } from "@/components/ui/sonner";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const antagon = localFont({
  src: "./fonts/Antagon.otf",
  variable: "--font-antagon",
  display: "swap",
});

const billSmith = localFont({
  src: "./fonts/BillSmith.ttf",
  variable: "--font-bill-smith",
  display: "swap",
});

const texgyreheros = localFont({
  src: "./fonts/texgyreheros-bold.otf",
  variable: "--font-texgyreheros",
  display: "swap",
});


export const metadata: Metadata = {
  title: "David Eshiwani",
  description: "Portfolio|UI/UX Designer|Graphic Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html
        lang="en"
        className={`${inter.variable} ${antagon.variable} ${billSmith.variable} ${texgyreheros.variable} h-full antialiased`}
      >
        <body className="">
          <ConvexClientProvider>
            {children}
            <Toaster/>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
