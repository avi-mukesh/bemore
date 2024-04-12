import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

function JournalEntrySkeleton() {
  return (
    <Card className="w-[80vw] md:w-[100%] h-[160px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-20 h-4 p-1" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-full p-6" />
      </CardContent>
    </Card>
  );
}

export function JournalEntriesSkeleton() {
  return (
    <div className="p-4 mx-auto grid gap-2 grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2">
      <JournalEntrySkeleton />
      <JournalEntrySkeleton />
      <JournalEntrySkeleton />
      <JournalEntrySkeleton />
      <JournalEntrySkeleton />
      <JournalEntrySkeleton />
    </div>
  );
}
