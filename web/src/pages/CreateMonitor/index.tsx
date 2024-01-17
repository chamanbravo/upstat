import DashboardLayout from "@/components/DashboardLayout";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

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
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(MonitorFormSchema),
    defaultValues: { name: "", url: "" },
  });

  async function onSubmit(formData: LoginFormValues) {
    try {
      setLoading(true);
      const response = await fetch("/api/monitors/create", {
        method: "POST",
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
      });

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

  return (
    <div className="m-auto max-w-[1200px] flex flex-col gap-4">
      <Helmet>
        <title>Add Monitor | Upstat</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Monitor</h1>
            <p className="text-muted-foreground">Create your monitor</p>
          </div>

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
                  <Button type="submit" className="ml-auto" disabled={loading}>
                    {loading ? "Loading..." : "Create"}
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
