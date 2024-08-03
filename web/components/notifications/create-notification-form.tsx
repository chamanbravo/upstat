"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import ProviderDropdown from "./provider-dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/clientFetch";

const NotificationFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
  webhookUrl: z
    .string({ required_error: "This field may not be blank." })
    .min(8, { message: "This field may not be blank." }),
});

type NotificationFormValues = z.infer<typeof NotificationFormSchema>;

interface Props {
  defaultValues?: any;
}

export default function CreateNotificationForm({ defaultValues }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>(
    defaultValues?.provider || "Discord"
  );

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(NotificationFormSchema),
    defaultValues: {
      name: defaultValues?.name,
      webhookUrl: defaultValues?.data.webhookUrl,
    },
  });

  const onSubmit = async (formData: NotificationFormValues) => {
    try {
      setLoading(true);
      const response = await clientFetch(
        defaultValues
          ? `/api/notifications/${defaultValues?.id}`
          : "/api/notifications",
        {
          method: defaultValues ? "PATCH" : "POST",
          body: JSON.stringify({
            name: formData.name,
            provider: provider,
            data: {
              webhookUrl: formData.webhookUrl,
            },
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        toast({
          title: defaultValues
            ? "Notification saved successfull."
            : "Notification created successfull.",
        });
        router.push("/notifications/");
        router.refresh();
      } else if (response.status === 400) {
        const data = await response.json();
        setLoading(false);
        return toast({
          title: data?.message,
        });
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
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
            <ProviderDropdown provider={provider} setProvider={setProvider} />
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
                      href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
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
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
