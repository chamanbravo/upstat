import { BarChartIcon } from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";

export function CumulativeToggle({
  pressed,
  onChange,
}: {
  pressed: boolean;
  onChange: (pressed: boolean) => void;
}) {
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onChange}
      variant="outline"
      aria-label="Cumulative Sum"
      className="border-2"
    >
      <BarChartIcon className="mr-2 h-4 w-4" />
      Cumulative Sum
    </Toggle>
  );
}
