import { Suspense } from "react";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import { Skeleton } from "@repo/ui/components/skeleton";

function LayoutPublicaciones({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <section className="py-12">
            <MaxWidthWrapper className="flex flex-col">
              <Skeleton className="font-['Abhaya_Libre'] text-4xl font-bold sm:text-5xl md:text-7xl w-fit px-3 text-transparent rounded-xl">
                Publicaciones
              </Skeleton>

              <div className="flex flex-row gap-4">
                
              </div>
            </MaxWidthWrapper>
          </section>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
export default LayoutPublicaciones;
