import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FrequencyDropdown from "./frequency-dropdown";
import HttpMethodDropdown from "./http-method-dropdown";

interface Props {
  form: any;
}

export default function EndpointForm({ form }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">Endpoint Check</h3>
        <p className="max-w-xs text-muted-foreground">
          Configure the target website you want to monitor.
        </p>
      </div>
      <div className="max-w-md space-y-4">
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
                <Input placeholder="https://johnsmith.com/ping" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <div>
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <>
                  <HttpMethodDropdown field={field} />
                  <span className="text-xs text-muted-foreground">
                    HTTP method used to make the request
                  </span>
                </>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <>
                  <FrequencyDropdown field={field} />
                  <span className="text-xs text-muted-foreground">
                    How often to ping your monitor?
                  </span>
                </>
              )}
            />
          </div>

          <span className="text-xs text-muted-foreground">
            2xx status code is checked to validate the response.
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          2xx status code is checked to validate the response.
        </span>
      </div>
    </div>
  );
}
