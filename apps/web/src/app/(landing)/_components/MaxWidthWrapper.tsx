// MaxWidthWrapper.tsx
import React, { ReactNode } from 'react';
import { cn } from "@repo/ui/lib/utils";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto px-4 max-w-7xl w-full", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;