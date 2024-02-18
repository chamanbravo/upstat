import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const pingFrequency = [
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

type Frequency = {
  label: string;
  value: number;
};

interface Props {
  frequency: Frequency;
  setFrequency: ({ label, value }: Frequency) => void;
}

export default function FrequencyDropdown({ frequency, setFrequency }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">
            {frequency.label}
          </span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] w-[220px]">
        <DropdownMenuRadioGroup
          value={`${frequency.value}`}
          onValueChange={(value) => {
            setFrequency(pingFrequency.filter((i) => i.value === +value)[0]);
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
