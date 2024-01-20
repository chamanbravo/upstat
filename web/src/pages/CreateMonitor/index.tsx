import DashboardLayout from "@/components/DashboardLayout";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { ChevronLeft, PauseCircle, Trash2 } from "lucide-react";

const MonitorFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  url: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
});

type LoginFormValues = z.infer<typeof MonitorFormSchema>;

export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [monitorInfo, setMonitorInfo] = useState({});

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(MonitorFormSchema),
    defaultValues: { name: "", url: "" },
  });

  async function onSubmit(formData: LoginFormValues) {
    try {
      setLoading(true);
      const response = await api(
        id ? `/api/monitors/update/${id}` : "/api/monitors/create",
        {
          method: id ? "PUT" : "POST",
          body: JSON.stringify({
            name: formData.name,
            url: formData.url,
            frequency: 60,
            method: "get",
            type: "http",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLoading(false);
        navigate("/app/monitors");
        return toast({
          title: "Monitor added successfull.",
        });
      } else if (response.status === 400) {
        const data = await response.json();
        return toast({
          title: data?.message,
        });
      }
    } catch (error) {
      toast({ title: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  const fetchMonitorInfo = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const response = await api(`/api/monitors/info/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        signal,
      });
      if (response.ok) {
        const data = await response.json();
        setMonitorInfo(data?.monitor);
        form.setValue("name", data?.monitor?.name);
        form.setValue("url", data?.monitor?.url);
      }
    } catch (error) {}
  };

  const pauseMonitor = async () => {
    try {
      const response = await api(`/api/monitors/pause/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        setMonitorInfo({ ...monitorInfo, status: "yellow" });
        return toast({
          title: "Monitor paused",
        });
      }
    } catch (error) {}
  };

  const resumeMonitor = async () => {
    try {
      const response = await api(`/api/monitors/resume/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        setMonitorInfo({ ...monitorInfo, status: "green" });
        return toast({
          title: "Monitor resumed",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchMonitorInfo(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="m-auto max-w-[1200px] flex flex-col gap-4">
      <Helmet>
        <title>Add Monitor | Upstat</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-8 w-full">
          {id ? (
            <div className="flex flex-col gap-3 w-full">
              <Button
                variant="ghost"
                className="w-fit text-muted-foreground p-2 h-7"
                onClick={() => navigate("/app/monitors")}
              >
                <ChevronLeft className="h-4 w-4" />
                Monitors
              </Button>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold flex gap-1 items-center">
                    {monitorInfo?.name}
                  </h1>
                  <p className="text-muted-foreground">Update Monitor</p>
                </div>
              </div>
              <div className="flex gap-4 items-centerm mt-4">
                <Button
                  variant="ghost"
                  className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
                  onClick={() => {
                    if (
                      monitorInfo?.status === "green" ||
                      monitorInfo?.status === "red"
                    ) {
                      pauseMonitor();
                    } else {
                      resumeMonitor();
                    }
                  }}
                >
                  <PauseCircle className="h-4 w-4" />
                  {monitorInfo?.status === "green"
                    ? "Pause"
                    : monitorInfo?.status === "yellow"
                    ? "Resume"
                    : "Pause"}{" "}
                  this monitor
                </Button>
                <Button
                  variant="ghost"
                  className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
                  onClick={() => navigate(`/app/monitors/configure/${id}`)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Monitor</h1>
              <p className="text-muted-foreground">Create your monitor</p>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">Endpoint Check</h3>
              <p className="text-muted-foreground max-w-xs">
                Configure the target website you want to monitor.
              </p>
            </div>

            <div className="w-full max-w-md">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="johnsmith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://johnsmith.com/ping"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : id ? "Update" : "Create"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
