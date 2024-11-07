"use client";

import { usePathname } from "next/navigation";
import Footer from "../_sections/Footer";

function LandingContent({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <>
      <main className="mt-[68px] flex flex-1 flex-col">{children}</main>
      {path !== "/sabores" && <Footer />}
    </>
  );
}
export default LandingContent;
