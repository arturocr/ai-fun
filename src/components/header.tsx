import { createClient } from '@/lib/supabase/server';
import HomeButton from './home-button';
import LoginButton from './login-button';
import { LogoutButton } from './logout-button';
import { ThemeToggle } from './theme-toggle';

export default async function Header() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <header className="flex justify-end items-center p-4 gap-2 h-16 fixed top-4 right-4 z-50">
      <HomeButton />
      {data?.user ? <LogoutButton /> : <LoginButton />}
      <ThemeToggle />
    </header>
  );
}
