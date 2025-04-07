'use client';

import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="rounded-full cursor-pointer relative"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      variant={theme === 'dark' ? 'ghost' : 'outline'}
      size="icon"
    >
      <Sun
        className={cn(
          'h-10 w-10',
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0',
        )}
      />
      <Moon
        className={cn(
          'absolute h-10 w-10',
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100',
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
