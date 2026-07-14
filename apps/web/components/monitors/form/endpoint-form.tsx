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
import MonitorTypeDropdown from "./monitor-type-dropdown";

interface Props {
  form: any;
}

export default function EndpointForm({ form }: Props) {
  const monitorType = form.watch("type") || "http";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">Endpoint Check</h3>
        <p className="max-w-xs text-muted-foreground">
          Configure the target you want to monitor.
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
          name="type"
          render={({ field }) => (
            <>
              <MonitorTypeDropdown field={field} />
              <span className="text-xs text-muted-foreground">
                Monitor type: HTTP checks status codes, ICMP pings the host, Port checks TCP connectivity
              </span>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>
                {monitorType === "icmp"
                  ? "Host (IP address)"
                  : monitorType === "port"
                  ? "Host:Port"
                  : "URL"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    monitorType === "icmp"
                      ? "192.168.1.1"
                      : monitorType === "port"
                      ? "192.168.1.1:8080"
                      : "https://johnsmith.com/ping"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {monitorType === "http" && (
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
          </div>
        )}

        <div>
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <>
                <FrequencyDropdown field={field} />
                <span className="text-xs text-muted-foreground">
                  How often to check your monitor?
                </span>
              </>
            )}
          />
        </div>

        {monitorType === "http" && (
          <span className="text-xs text-muted-foreground">
            2xx status code is checked to validate the response.
          </span>
        )}
        {monitorType === "icmp" && (
          <span className="text-xs text-muted-foreground">
            ICMP echo request is sent to verify host reachability.
          </span>
        )}
        {monitorType === "port" && (
          <span className="text-xs text-muted-foreground">
            TCP connection attempt is made to verify port accessibility.
          </span>
        )}
      </div>
    </div>
  );
}
