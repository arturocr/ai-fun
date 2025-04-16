import AuthLayout from '@/components/auth-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Something went wrong.</CardTitle>
          </CardHeader>
          <CardContent>
            {params?.error ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Code error: {params.error}
              </p>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                An unspecified error occurred.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
