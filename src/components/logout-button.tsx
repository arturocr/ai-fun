'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Button className="cursor-pointer" onClick={logout} size="sm">
      Logout <LogOut />
    </Button>
  );
}
