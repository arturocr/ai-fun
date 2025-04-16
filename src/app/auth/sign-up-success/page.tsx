import AuthLayout from '@/components/auth-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Thank you for signing up!
            </CardTitle>
            <CardDescription>Check your email to confirm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
