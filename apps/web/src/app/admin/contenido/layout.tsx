import { Suspense } from "react";

function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}

export default ContentLayout;
