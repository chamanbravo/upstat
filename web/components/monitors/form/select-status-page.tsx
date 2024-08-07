import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import EmptyState from "@/components/status-pages/empty-state";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  form: any;
  statusPages: any;
}

export default function SelectStatusPage({ form, statusPages }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">Status Pages</h3>
        <p className="max-w-xs text-muted-foreground">
          Select the pages where you want to display the monitor.
        </p>
      </div>

      <div className="w-full max-w-md">
        {!statusPages ? (
          <EmptyState />
        ) : (
          <FormField
            control={form.control}
            name="channels"
            render={() => (
              <FormItem className="space-y-4">
                {statusPages?.map((item: any) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="statusPages"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center p-4 space-x-3 space-y-0 border rounded"
                        >
                          <FormControl>
                            <Checkbox
                              checked={
                                field.value?.includes(String(item.id)) || false
                              }
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      String(item.id),
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) =>
                                          value !== String(item.id)
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
                              {item.slug}
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
