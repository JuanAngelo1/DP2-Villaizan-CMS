import { Suspense } from "react";

function LayoutPublicacion({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback="Cargando...">{children}</Suspense>
    </>
  );
}
export default LayoutPublicacion;
