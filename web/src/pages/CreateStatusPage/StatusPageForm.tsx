import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
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
import { client } from "@/lib/utils";

const { GET, POST, PUT } = client;

const StatusPageFormSchema = z.object({
  name: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
  slug: z
    .string({ required_error: "This field may not be blank." })
    .min(2, { message: "This field may not be blank." }),
});

type StatusPageFormValues = z.infer<typeof StatusPageFormSchema>;

export default function CreateStatusPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<StatusPageFormValues>({
    resolver: zodResolver(StatusPageFormSchema),
    defaultValues: { name: "", slug: "" },
  });

  async function onSubmit(formData: StatusPageFormValues) {
    try {
      if (id) {
        setLoading(true);
        const { response } = await PUT("/api/status-pages/update/{id}", {
          params: {
            path: { id: id },
          },
          body: {
            name: formData.name,
            slug: formData.slug,
          },
        });

        if (response.ok) {
          setLoading(false);
          navigate("/app/status-pages");
          return toast({
            title: "Status page updated successfull.",
          });
        } else if (response.status === 400) {
          const data = await response.json();
          return toast({
            title: data?.message,
          });
        }
      } else {
        setLoading(true);
        const { response } = await POST("/api/status-pages/create", {
          body: {
            name: formData.name,
            slug: formData.slug,
          },
        });

        if (response.ok) {
          setLoading(false);
          navigate("/app/status-pages");
          return toast({
            title: "Status page created successfull.",
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
    } finally {
      setLoading(false);
    }
  }

  const fetchStatusPageInfo = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET("/api/status-pages/info/{id}", {
        params: {
          path: {
            id,
          },
        },
        signal,
      });

      if (response.ok && data) {
        form.setValue("name", data?.statusPage?.name || "");
        form.setValue("slug", data?.statusPage?.slug || "");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchStatusPageInfo(signal);
  }, []);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Basic information</h3>
          <p className="max-w-xs text-muted-foreground">
            A public status page informs your users about the uptime of your
            services.
          </p>
        </div>

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
                    <FormLabel>Company/Org's Name</FormLabel>
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
                {loading ? "Loading..." : id ? "Update" : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
