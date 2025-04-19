import { AlertCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

import InternalLayout from '@/components/internal-layout';
import SearchHistoryCard from '@/components/search-history-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createClient } from '@/lib/supabase/server';

export default async function MyHistory() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect('/login');
  }

  // Fetch user's search history
  const { data: searchHistory, error: historyError } = await supabase
    .from('search_history')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <InternalLayout>
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">My Past Searches</h1>

        {historyError && (
          <Alert variant={'destructive'} className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading search history: {historyError.message}
            </AlertDescription>
          </Alert>
        )}

        {!searchHistory || searchHistory.length === 0 ? (
          <div className="p-6 bg-background border border-border rounded-lg shadow-sm">
            <p className="text-muted-foreground">
              You haven't made any past searches yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchHistory.map((search) => (
              <SearchHistoryCard key={search.id} search={search} />
            ))}
          </div>
        )}
      </div>
    </InternalLayout>
  );
}
