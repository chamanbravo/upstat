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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ProviderDropdown from "./ProviderDropdown";
import { Link } from "react-router-dom";

const NotificationFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
  webhookUrl: z.string({ required_error: "This field may not be blank." }),
});

type NotificationFormValues = z.infer<typeof NotificationFormSchema>;

export default function CreateNotification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>("Discord");

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(NotificationFormSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(formData: NotificationFormValues) {
    try {
      setLoading(true);
    } catch (error) {
      toast({ title: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

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
                          How to setup your Slack webhook
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
