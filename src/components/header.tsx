import { History } from 'lucide-react';
import Link from 'next/link';

import { createClient } from '@/lib/supabase/server';
import HomeButton from './home-button';
import LoginButton from './login-button';
import { LogoutButton } from './logout-button';
import SignUpButton from './sign-up-button';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

export default async function Header() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <header>
      <div className="container max-w-5xl mx-auto py-3 px-4 flex justify-between items-center gap-2">
        <HomeButton />
        <div className="flex items-center gap-2">
          {data?.user ? (
            <>
              <small className="text-sm font-medium leading-none">
                Hello, {data?.user.email}
              </small>
              <Button asChild size="sm">
                <Link href="/past-searches">
                  Past Searches <History />
                </Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <SignUpButton />
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
