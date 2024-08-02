import { BellDotIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center py-4 border">
      <BellDotIcon />
      <h3>No monitors</h3>
      <p className="text-muted-foreground">Create your first monitor.</p>
      <Button className="mt-4" asChild>
        <Link href="/monitors/create">Create</Link>
      </Button>
    </div>
  );
}
