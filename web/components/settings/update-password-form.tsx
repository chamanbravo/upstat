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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const accountFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Current Password is required",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: AccountFormValues) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/users/update-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast({
          title: "Password updated.",
        });
      } else if (response.status === 400) {
        const { message } = await response.json();
        toast({
          title: message,
        });
      }
      setLoading(false);
    } catch (err) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  type="password"
                  placeholder="Current Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
}
