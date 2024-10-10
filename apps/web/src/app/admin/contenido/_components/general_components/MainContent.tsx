import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

function MainContent({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex h-auto flex-1 flex-col overflow-y-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 overflow-y-hidden pt-0">{children}</CardContent>
    </Card>
  );
}
export default MainContent;
