import { Suspense } from "react";

function LayoutPublicacion({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback="CARGANDO CARAJO..">{children}</Suspense>
    </>
  );
}
export default LayoutPublicacion;
