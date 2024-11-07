import { Suspense } from "react";

function LayoutPublicaciones({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback="Cargando...">{children}</Suspense>
    </>
  );
}
export default LayoutPublicaciones;
