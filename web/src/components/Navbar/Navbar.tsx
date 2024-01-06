import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import useThemeStore from "@/store/ThemeStore";

export default function Navbar() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggle);

  return (
    <div className="border-b sticky top-0 z-10 bg-background">
      <div className="m-auto max-w-[1200px] flex items-center py-2 px-4">
        <span className="font-bold">Upstat</span>

        <div className="ml-auto flex items-center">
          <Button variant="ghost" className="w-9 px-0" onClick={toggleTheme}>
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
