import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function LoginButton() {
  return (
    <Button asChild size="sm">
      <Link href="/auth/login">
        Login <LogIn />
      </Link>
    </Button>
  );
}
