import { cn } from "@repo/ui/lib/utils";

function SectionWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full w-full flex-col gap-2 overflow-y-hidden p-1", className)}>{children}</div>
  );
}
export default SectionWrapper;
