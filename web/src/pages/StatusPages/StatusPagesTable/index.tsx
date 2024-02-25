import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { components } from "@/lib/api/v1";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { client } from "@/lib/utils";

const { GET } = client;

export default function StatusPagesTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setDate] = useState<
    components["schemas"]["ListStatusPagesOut"]["statusPages"]
  >([]);

  const fetchStatusPages = async (signal: AbortSignal) => {
    try {
      const { response, data } = await GET(`/api/status-pages/list`, {
        signal,
      });
      if (response.ok) {
        setDate(data?.statusPages || []);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchStatusPages(abortController.signal);
  }, []);

  if (loading) {
    return (
      <span className="text-center text-muted-foreground">Loading...</span>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center py-4 border">
        <h3>No status pages</h3>
        <p className="text-muted-foreground">Create your first status page.</p>
        <Button className="mt-4" asChild>
          <Link to="/app/status-pages/create">Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data || []}
      fetchData={fetchStatusPages}
    />
  );
}
