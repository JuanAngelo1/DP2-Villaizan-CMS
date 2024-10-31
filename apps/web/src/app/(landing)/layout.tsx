"use client"
// layout.tsx
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./_sections/Footer";
import Header from "./_sections/Header";
import "./landing.css";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const path = usePathname();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mt-[68px] flex flex-1 flex-col">{children}</main>
      {path !== "/sabores" && <Footer />}
    </div>
  );
}
