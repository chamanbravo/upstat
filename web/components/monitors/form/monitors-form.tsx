"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SelectNotificationChannel from "./select-notification-channel";
import SelectStatusPage from "./select-status-page";
import EndpointForm from "./endpoint-form";
import { clientFetch } from "@/lib/api/clientFetch";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const MonitorFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  url: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  channels: z.array(z.string()),
  statusPages: z.array(z.string()),
  frequency: z.number(),
  method: z.string(),
});

type MonitorFormValues = z.infer<typeof MonitorFormSchema>;

interface Props {
  notificationChannels: any;
  statusPages: any;
  defaultValues?: any;
}

export default function MonitorsForm({
  notificationChannels,
  statusPages,
  defaultValues,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<MonitorFormValues>({
    resolver: zodResolver(MonitorFormSchema),
    defaultValues: {
      ...(defaultValues
        ? defaultValues
        : {
            name: "",
            url: "",
            channels: [],
            statusPages: [],
            frequency: 60,
            method: "get",
          }),
    },
  });

  async function onSubmit(formData: MonitorFormValues) {
    try {
      setLoading(true);
      const response = await clientFetch(
        defaultValues ? `/api/monitors/${defaultValues?.id}` : "/api/monitors",
        {
          method: defaultValues ? "PATCH" : "POST",
          body: JSON.stringify({
            name: formData.name,
            url: formData.url,
            frequency: formData.frequency,
            method: formData.method,
            type: "http",
            notificationChannels: formData.channels,
            statusPages: formData.statusPages,
          }),
        }
      );
      if (response.ok) {
        toast({ title: "Monitor created successfully." });
      }
      setLoading(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      toast({ title: "Monitor created successfully." });
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-12"
        >
          <EndpointForm form={form} />
          <Separator />
          <SelectNotificationChannel
            form={form}
            notificationChannels={notificationChannels}
          />
          <Separator />
          <SelectStatusPage form={form} statusPages={statusPages} />
          <Button type="submit" disabled={loading} className="ml-auto">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
