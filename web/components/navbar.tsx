import CommandMenu from "./command-menu";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 border-b bg-background">
      <div className="m-auto max-w-[1200px] flex items-center py-2 px-4">
        <span className="font-bold">Upstat</span>

        <div className="flex items-center gap-2 ml-auto">
          <CommandMenu />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
