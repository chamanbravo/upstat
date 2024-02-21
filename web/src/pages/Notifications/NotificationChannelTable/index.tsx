import { BellDotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { components } from "@/lib/api/v1";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { client } from "@/lib/utils";

const { GET } = client;

export default function NotificationChannelTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setDate] = useState<
    components["schemas"]["NotificationListOut"]["notifications"]
  >([]);

  const fetchNotifications = async (signal: AbortSignal) => {
    try {
      const { response, data } = await GET(`/api/notifications/list`, {
        signal,
      });
      if (response.ok) {
        setDate(data?.notifications || []);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchNotifications(abortController.signal);
  }, []);

  if (loading) {
    return (
      <span className="text-center text-muted-foreground">Loading...</span>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center py-4 border">
        <BellDotIcon />
        <h3>No notifications channels</h3>
        <p className="text-muted-foreground">
          Create your first notification channel
        </p>
        <Button className="mt-4" asChild>
          <Link to="/app/notifications/create">Create</Link>
        </Button>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data || []}
      fetchData={fetchNotifications}
    />
  );
}
