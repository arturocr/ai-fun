'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <Button
        className="cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
        size="sm"
        variant="secondary"
      >
        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
