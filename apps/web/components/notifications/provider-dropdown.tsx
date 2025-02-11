import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

const providers = ["Discord", "Slack"];

interface Props {
  provider: string;
  setProvider: (provider: string) => void;
}

export default function ProviderDropdown({ provider, setProvider }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border min-w-[150px] w-full inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">{provider}</span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[450px]">
        <DropdownMenuRadioGroup
          value={provider}
          onValueChange={(value) => {
            setProvider(value);
          }}
        >
          {providers.map((provider) => (
            <DropdownMenuRadioItem key={provider} value={provider}>
              {provider}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
