import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ProviderDropdown from "./ProviderDropdown";
import { Link } from "react-router-dom";
import { client } from "@/lib/utils";

const { GET, POST, PUT } = client;

const NotificationFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
  webhookUrl: z
    .string({ required_error: "This field may not be blank." })
    .min(8, { message: "This field may not be blank." }),
});

type NotificationFormValues = z.infer<typeof NotificationFormSchema>;

export default function CreateNotification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>("Discord");

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(NotificationFormSchema),
    defaultValues: { name: "", webhookUrl: "" },
  });

  async function onSubmit(formData: NotificationFormValues) {
    try {
      if (id) {
        setLoading(true);
        const { response } = await PUT("/api/notifications/update/{id}", {
          params: {
            path: { id: id },
          },
          body: {
            name: formData.name,
            provider: provider,
            data: {
              webhookUrl: formData.webhookUrl,
            },
          },
        });

        if (response.ok) {
          setLoading(false);
          navigate("/app/notifications");
          return toast({
            title: "Notification updated successfull.",
          });
        } else if (response.status === 400) {
          const data = await response.json();
          return toast({
            title: data?.message,
          });
        }
      } else {
        setLoading(true);
        const { response } = await POST("/api/notifications/create", {
          body: {
            name: formData.name,
            provider: provider,
            data: {
              webhookUrl: formData.webhookUrl,
            },
          },
        });

        if (response.ok) {
          setLoading(false);
          navigate("/app/notifications");
          return toast({
            title: "Notification created successfull.",
          });
        } else if (response.status === 400) {
          const data = await response.json();
          return toast({
            title: data?.message,
          });
        }
      }
    } catch (error) {
      toast({ title: "Something went wrong." });
    }
  }

  const fetchNotificationInfo = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET("/api/notifications/info/{id}", {
        params: {
          path: {
            id,
          },
        },
        signal,
      });

      if (response.ok && data) {
        form.setValue("name", data?.notification?.name || "");
        if (data?.notification?.provider === "Discord")
          form.setValue(
            "webhookUrl",
            data?.notification?.data?.webhookUrl || ""
          );
        setProvider(data?.notification?.provider || "");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchNotificationInfo(signal);
  }, []);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Alerts</h3>
          <p className="max-w-xs text-muted-foreground">
            Select the notification channels you want to be informed.
          </p>
        </div>

        <div className="w-full max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Provider
                </span>
                <ProviderDropdown
                  provider={provider}
                  setProvider={setProvider}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Upstat Alert" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {provider === "Discord" && (
                <FormField
                  control={form.control}
                  name="webhookUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Webhook URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://discord.com/api/webhooks/..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        <Link
                          to="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                          target="_blank"
                          className="ml-auto cursor-pointer hover:underline"
                        >
                          How to setup your Discord webhook
                        </Link>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : id ? "Update" : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
