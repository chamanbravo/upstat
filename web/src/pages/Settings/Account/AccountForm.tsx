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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useUserStore from "@/store/UserStore";
import { api } from "@/lib/api";

const accountFormSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "Required",
    })
    .max(30, {
      message: "Must be less than 30 characters.",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Required",
    })
    .max(30, {
      message: "Must be less than 30 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const firstname = useUserStore((state) => state.firstname);
  const lastname = useUserStore((state) => state.lastname);
  const username = useUserStore((state) => state.username);
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    firstname,
    lastname,
  };
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(formData: AccountFormValues) {
    try {
      const response = await api(`/api/users/update/${username}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Account updated!",
        });
        setUser(username, formData.firstname, formData.lastname);
      } else {
        const data = await response.json();
        toast({
          title: data?.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="given-name"
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="family-name"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Update Account"}
        </Button>
      </form>
    </Form>
  );
}
