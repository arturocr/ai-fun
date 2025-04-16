"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-2 h-16 fixed top-4 right-4 z-50">
      <ThemeToggle />
    </header>
  );
}
