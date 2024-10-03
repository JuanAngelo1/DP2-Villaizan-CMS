import * as React from "react";

import { cn } from "@repo/ui/lib/utils";

const CardTable = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card text-card-foreground rounded-l border shadow-sm p-4", className)}
    {...props}
  />
));
CardTable.displayName = "CardTable";

export { CardTable };
