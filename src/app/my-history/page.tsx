import { redirect } from 'next/navigation';

import InternalLayout from '@/components/internal-layout';
import { createClient } from '@/lib/supabase/server';

export default async function MyHistory() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <InternalLayout>
      <h1>My History</h1>
    </InternalLayout>
  );
}
