// layout.tsx
import React from "react";
import Footer from "./_sections/Footer";
import Header from "./_sections/Header";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col  bg-white">
      <Header />
      <main className="flex-1 mt-20 h-full">{children}</main>
      <Footer />
    </div>
  );
}
