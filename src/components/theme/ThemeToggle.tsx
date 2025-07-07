import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, isDark, toggleDarkMode } = useTheme();

  const themes = [
    { name: "light", label: "Light", icon: Sun },
    { name: "sunset", label: "Sunset", icon: Palette },
    { name: "ocean", label: "Ocean", icon: Palette },
    { name: "forest", label: "Forest", icon: Palette },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Dark/Light Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDarkMode}
        className="h-10 w-10 p-0 rounded-full hover:bg-sidebar-accent transition-all duration-300"
      >
        <div className="relative w-6 h-6">
          <Sun className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} />
          <Moon className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} />
        </div>
      </Button>

      {/* Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-full hover:bg-sidebar-accent"
          >
            <Palette className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass backdrop-blur-xl border-sidebar-border">
          {themes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name as any)}
              className={`cursor-pointer hover:bg-sidebar-accent/50 ${
                theme === themeOption.name ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
              }`}
            >
              <themeOption.icon className="w-4 h-4 mr-2" />
              {themeOption.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}