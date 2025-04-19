import { UserPlus } from 'lucide-react';
import Link from 'next/link';

import { Button } from './ui/button';

export default function SignUpButton() {
  return (
    <Button asChild size="sm">
      <Link href="/auth/sign-up">
        Sign Up <UserPlus />
      </Link>
    </Button>
  );
}
