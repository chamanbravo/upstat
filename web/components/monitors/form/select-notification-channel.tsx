import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import EmptyState from "@/components/notifications/empty-state";
import { Checkbox } from "@/components/ui/checkbox";

export default function SelectNotificationChannel({
  form,
  notificationChannels,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">Notifications</h3>
        <p className="max-w-xs text-muted-foreground">
          Select the notification channels you want to be informed.
        </p>
      </div>

      <div className="w-full max-w-md">
        {notificationChannels?.length === 0 ? (
          <EmptyState />
        ) : (
          <FormField
            control={form.control}
            name="channels"
            render={() => (
              <FormItem className="space-y-4">
                {notificationChannels?.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="channels"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center p-4 space-x-3 space-y-0 border rounded"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id) || false}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="flex items-center gap-4 cursor-pointer">
                            <span className="text-base font-medium">
                              {item.name}
                            </span>
                            <span className="font-normal text-muted-foreground">
                              {item.provider}
                            </span>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}
