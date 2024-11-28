import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@repo/ui/components/toaster";
import { Inter } from "next/font/google";
import "@repo/ui/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heladería Villaizan",
  robots: {
    follow: true,
    index: false,
  },
  description: "El papa de las paletas",
  keywords: ["heladería", "paletas", "Heladería Villaizan", "Villaizan", "Villaizan Helados", "Villaizan Heladería", "Villaizan Paletas"],
  openGraph: {
    title: "Heladería Villaizan",
    description: "El papa de las paletas",
    url: "https://landing.heladosvillaizan.tech",
    siteName: "Heladería Villaizan",
    images: [
      {
        url: "https://landing.heladosvillaizan.tech/VillaizanLogoV.png",
        width: 400,
        height: 400,
        alt: "Heladería Villaizan",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
