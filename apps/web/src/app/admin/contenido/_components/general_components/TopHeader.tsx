import { cn } from "@repo/ui/lib/utils";

function TopHeader({children, className}: {children: React.ReactNode; className?: string}) {
  return <div className={cn("flex flex-row justify-end gap-2", className)}>{children}</div>;
}
export default TopHeader;
