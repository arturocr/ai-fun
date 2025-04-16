'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from './ui/button';

export default function HomeButton() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <Button asChild size="sm">
      <Link href="/">
        <Home />
      </Link>
    </Button>
  );
}
