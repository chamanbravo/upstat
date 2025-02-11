import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

type Frequency = {
  label: string;
  value: number;
};

export const pingFrequency: Frequency[] = [
  {
    label: "1 minute",
    value: 60,
  },
  {
    label: "5 minutes",
    value: 300,
  },
  {
    label: "15 minutes",
    value: 900,
  },
  {
    label: "30 minutes",
    value: 1800,
  },
  {
    label: "1 hour",
    value: 3600,
  },
];

interface Props {
  field: {
    value: number;
    onChange: (value: number) => void;
  };
}

export default function FrequencyDropdown({ field }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">
            {pingFrequency?.find((i) => i.value === field?.value)?.label ||
              pingFrequency[0].label}
          </span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] w-[220px]">
        <DropdownMenuRadioGroup
          value={`${field.value}`}
          onValueChange={(value) => {
            field.onChange(+value);
          }}
        >
          {pingFrequency.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={`${item.value}`}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
