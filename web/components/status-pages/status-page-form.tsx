"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/clientFetch";

const StatusPageFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
  slug: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
});

type StatusPageFormValues = z.infer<typeof StatusPageFormSchema>;

interface Props {
  defaultValues?: any;
}

export default function StatusPageForm({ defaultValues }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<StatusPageFormValues>({
    resolver: zodResolver(StatusPageFormSchema),
    defaultValues: { ...defaultValues },
  });

  async function onSubmit(formData: StatusPageFormValues) {
    try {
      setLoading(true);
      const response = await clientFetch(
        defaultValues
          ? `/api/status-pages/${defaultValues?.id}`
          : "/api/status-pages",
        {
          method: defaultValues ? "PATCH" : "POST",
          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        toast({
          title: defaultValues
            ? "Status page saved successfully."
            : "Status page creted successfully.",
        });
        router.push("/status-pages");
        router.refresh();
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
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Company/Org&apso;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="Himali Goat Softwares" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="unique_slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
