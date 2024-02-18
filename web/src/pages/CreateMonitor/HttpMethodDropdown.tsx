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
  method: string;
  setMethod: (method: string) => void;
}

export default function HttpMethodDropdown({ method, setMethod }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">{method}</span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] w-[220px]">
        <DropdownMenuRadioGroup
          value={method}
          onValueChange={(value) => {
            setMethod(value);
          }}
        >
          {methods.map((method) => (
            <DropdownMenuRadioItem key={method} value={method}>
              {method}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
