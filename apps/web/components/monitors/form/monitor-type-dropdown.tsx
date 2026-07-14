import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

const monitorTypes = [
  { value: "http", label: "HTTP(s)" },
  { value: "icmp", label: "ICMP Ping" },
  { value: "port", label: "Port Check" },
];

interface Props {
  field: any;
}

export default function MonitorTypeDropdown({ field }: Props) {
  const current = monitorTypes.find((t) => t.value === field.value);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">
            {current?.label || "HTTP(s)"}
          </span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
          }}
        >
          {monitorTypes.map((type) => (
            <DropdownMenuRadioItem key={type.value} value={type.value}>
              {type.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
