import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

const methods = ["GET"];

interface Props {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export default function HttpMethodDropdown({ field }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">
            {field.value.toUpperCase() || methods[0]}
          </span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] w-[220px]">
        <DropdownMenuRadioGroup
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
          }}
        >
          {methods.map((method) => (
            <DropdownMenuRadioItem key={method} value={field.value}>
              {method}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
