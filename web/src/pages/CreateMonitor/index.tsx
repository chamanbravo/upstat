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
import { client } from "@/lib/utils";
import { components } from "@/lib/api/v1";
import HttpMethodDropdown from "./HttpMethodDropdown";
import FrequencyDropdown, { pingFrequency } from "./FrequencyDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const { GET } = client;

const MonitorFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  url: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  channels: z.array(z.string()),
  statusPages: z.array(z.string()),
});

type LoginFormValues = z.infer<typeof MonitorFormSchema>;

export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [monitorInfo, setMonitorInfo] = useState<
    components["schemas"]["MonitorInfoOut"]["monitor"]
  >({});
  const [method, setMethod] = useState<string>("GET");
  const [frequency, setFrequency] = useState({
    label: "1 minute",
    value: 60,
  });
  const [notificationChannels, setNotificationChannels] = useState<
    components["schemas"]["NotificationListOut"]["notifications"]
  >([]);
  const [statusPages, setStatusPages] = useState<
    components["schemas"]["ListStatusPagesOut"]["statusPages"]
  >([]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(MonitorFormSchema),
    defaultValues: { name: "", url: "", channels: [], statusPages: [] },
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
            frequency: frequency.value,
            method: method,
            type: "http",
            notificationChannels: formData.channels,
            statusPages: formData.statusPages,
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
      const { response, data } = await GET(`/api/monitors/info/{id}`, {
        params: {
          path: {
            id: `${id}`,
          },
        },
        signal,
      });
      if (response.ok) {
        setMonitorInfo(data?.monitor);
        form.setValue("name", data?.monitor?.name || "");
        form.setValue("url", data?.monitor?.url || "");
        setMethod(data?.monitor?.method?.toUpperCase() || "GET");
        setFrequency({
          label: pingFrequency.filter(
            (f) => f.value === data?.monitor?.frequency
          )[0].label,
          value: data?.monitor?.frequency || 60,
        });
      }
    } catch (error) {}
  };

  const fetchNotificationChannels = async (signal: AbortSignal) => {
    try {
      const { response, data } = await GET(`/api/notifications/list`, {
        signal,
      });
      if (response.ok) {
        setNotificationChannels(data?.notifications || []);
      }
    } catch (error) {}
  };

  const fetchMonitorsNotificationChannels = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET(`/api/monitors/{id}/notifications`, {
        params: {
          path: {
            id: `${id}`,
          },
        },
        signal,
      });
      if (response.ok) {
        if (data?.notifications?.length) {
          form.setValue("channels", [
            ...data.notifications
              .map((i) => i.id)
              .filter((id): id is string => !!id),
          ]);
        }
      }
    } catch (error) {}
  };

  const fetchStatusPages = async (signal: AbortSignal) => {
    try {
      const { response, data } = await GET(`/api/status-pages/list`, {
        signal,
      });
      if (response.ok) {
        setStatusPages(data?.statusPages || []);
      }
    } catch (error) {}
  };

  const fetchMonitorsStatusPages = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET(`/api/monitors/{id}/status-pages`, {
        params: {
          path: {
            id: `${id}`,
          },
        },
        signal,
      });
      if (response.ok) {
        if (data?.statusPages?.length) {
          form.setValue("statusPages", [
            ...data?.statusPages.map((i) => String(i.id)),
          ]);
        }
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

  const deleteMonitor = async () => {
    try {
      const response = await api(`/api/monitors/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/app/monitors");
        return toast({
          title: "Monitor deleted successfull.",
        });
      } else {
        return toast({
          title: "Something went wrong.",
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchMonitorInfo(signal);
    fetchNotificationChannels(signal);
    fetchMonitorsNotificationChannels(signal);
    fetchStatusPages(signal);
    fetchMonitorsStatusPages(signal);
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
        <div className="flex flex-col w-full gap-8">
          {id ? (
            <div className="flex flex-col w-full gap-3">
              <Button
                variant="ghost"
                className="p-2 w-fit text-muted-foreground h-7"
                onClick={() => navigate(`/app/monitors/${monitorInfo?.id}`)}
              >
                <ChevronLeft className="w-4 h-4" />
                Monitor
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="flex items-center gap-1 text-2xl font-semibold">
                    {monitorInfo?.name}
                  </h1>
                  <p className="text-muted-foreground">Update Monitor</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 items-centerm">
                <Button
                  variant="ghost"
                  className="flex gap-1 p-2 w-fit text-muted-foreground h-7"
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
                  <PauseCircle className="w-4 h-4" />
                  {monitorInfo?.status === "green"
                    ? "Pause"
                    : monitorInfo?.status === "yellow"
                    ? "Resume"
                    : "Pause"}{" "}
                  this monitor
                </Button>
                <Button
                  variant="ghost"
                  className="flex gap-1 p-2 w-fit text-muted-foreground h-7"
                  onClick={deleteMonitor}
                >
                  <Trash2 className="w-4 h-4" />
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

          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-12"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">Endpoint Check</h3>
                    <p className="max-w-xs text-muted-foreground">
                      Configure the target website you want to monitor.
                    </p>
                  </div>
                  <div className="max-w-md space-y-4">
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

                    <div className="flex gap-2">
                      <div>
                        <HttpMethodDropdown
                          method={method}
                          setMethod={setMethod}
                        />
                        <span className="text-xs text-muted-foreground">
                          HTTP method used to make the request
                        </span>
                      </div>
                      <div>
                        <FrequencyDropdown
                          frequency={frequency}
                          setFrequency={setFrequency}
                        />
                        <span className="text-xs text-muted-foreground">
                          How often to ping your monitor?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">Notifications</h3>
                    <p className="max-w-xs text-muted-foreground">
                      Select the notification channels you want to be informed.
                    </p>
                  </div>

                  <div className="w-full max-w-md">
                    {notificationChannels?.length === 0 ? (
                      <div className="flex flex-row">
                        <div>
                          <h3>No notifications channels</h3>
                          <p className="text-muted-foreground">
                            Create your first notification channel
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 ml-auto"
                          asChild
                        >
                          <Link to="/app/notifications/create">Create</Link>
                        </Button>
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="channels"
                        render={() => (
                          <FormItem className="space-y-4">
                            {notificationChannels?.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="channels"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-center p-4 space-x-3 space-y-0 border rounded"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={
                                            item.id
                                              ? field.value?.includes(item.id)
                                              : false
                                          }
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="flex items-center gap-4 cursor-pointer">
                                        <span className="text-base font-medium">
                                          {item.name}
                                        </span>
                                        <span className="font-normal text-muted-foreground">
                                          {item.provider}
                                        </span>
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">Status Pages</h3>
                    <p className="max-w-xs text-muted-foreground">
                      Select the pages where you want to display the monitor.
                    </p>
                  </div>

                  <div className="w-full max-w-md">
                    {statusPages?.length === 0 ? (
                      <div className="flex flex-row">
                        <div>
                          <h3>No status pages</h3>
                          <p className="text-muted-foreground">
                            Create your first status page.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 ml-auto"
                          asChild
                        >
                          <Link to="/app/status-pages/create">Create</Link>
                        </Button>
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="channels"
                        render={() => (
                          <FormItem className="space-y-4">
                            {statusPages?.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="statusPages"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-center p-4 space-x-3 space-y-0 border rounded"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={
                                            item.id
                                              ? field.value?.includes(
                                                  String(item.id)
                                                )
                                              : false
                                          }
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  String(item.id),
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== String(item.id)
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="flex items-center gap-4 cursor-pointer">
                                        <span className="text-base font-medium">
                                          {item.name}
                                        </span>
                                        <span className="font-normal text-muted-foreground">
                                          {item.slug}
                                        </span>
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="ml-auto">
                  {loading ? "Loading..." : id ? "Update" : "Create"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
