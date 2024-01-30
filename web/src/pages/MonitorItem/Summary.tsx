import { Card, CardTitle } from "@/components/ui/card";

export default function Summary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="px-4 py-5 flex flex-col gap-3">
        <CardTitle className="text-muted-foreground font-normal">
          Avg. Response
        </CardTitle>
        <p className="text-xl font-semibold">230 ms</p>
      </Card>
      <Card className="px-4 py-5 flex flex-col gap-3">
        <CardTitle className="text-muted-foreground font-normal">
          Uptime (24 hour)
        </CardTitle>
        <p className="text-xl font-semibold">100%</p>
      </Card>
      <Card className="px-4 py-5 flex flex-col gap-3">
        <CardTitle className="text-muted-foreground font-normal">
          Uptime (30 days)
        </CardTitle>
        <p className="text-xl font-semibold">Content</p>
      </Card>
      <Card className="px-4 py-5 flex flex-col gap-3">
        <CardTitle className="text-muted-foreground font-normal">
          Cert Exp.
        </CardTitle>
        <p className="text-xl font-semibold">258 days</p>
      </Card>
    </div>
  );
}
