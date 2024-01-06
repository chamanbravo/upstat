import { useState } from "react";
import { useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
// import { paths } from "@/lib/api/v1";
// import createClient from "openapi-fetch";
import Cookies from "js-cookie";
// import { useUser } from "@/contexts/UserContext";
// import { useQuery } from "@/lib/hooks";

const loginFormSchema = z.object({
  username: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
  password: z
    .string({ required_error: "This field may not be blank." })
    .min(1, { message: "This field may not be blank." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSignUpURLClick: () => void;
}

// const client = createClient<paths>({ baseUrl: "/" });
// const { POST } = client;

export default function LoginForm({
  onSignUpURLClick: onSignUpURLClick,
}: LoginFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  //   const { setUser } = useUser();
  //   const query = useQuery();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(formData: LoginFormValues) {
    // try {
    //   setLoading(true);
    //   const { error, response, data } = await POST("/api/users/login/", {
    //     body: {
    //       username: formData.username,
    //       password: formData.password,
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": Cookies.get("csrftoken") || "",
    //     },
    //   });
    //   if (response.ok && data?.id && data?.email && data?.username) {
    //     setUser(
    //       data.id,
    //       data.username,
    //       data.email,
    //       data.first_name || undefined,
    //       data.last_name || undefined
    //     );
    //     setLoading(false);
    //     navigate(query.get("next") || "/dashboard/");
    //   } else {
    //     if (error?.username)
    //       form.setError("username", { message: error.username[0] });
    //     if (error?.password)
    //       form.setError("password", { message: error.password[0] });
    //     if (error?.detail) toast({ title: error.detail });
    //     // if there is no error details, show generic error
    //     if (!error?.username && !error?.password && !error?.detail)
    //       toast({ title: "Something went wrong." });
    //   }
    // } catch (error) {
    //   toast({ title: "Something went wrong." });
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      placeholder="johnsmith"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p
          className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 cursor-pointer text-center w-full"
          onClick={() => onSignUpURLClick()}
        >
          Don&apos;t have an account? Sign Up
        </p>
      </CardFooter>
    </Card>
  );
}
