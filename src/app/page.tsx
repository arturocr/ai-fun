import InternalLayout from '@/components/internal-layout';
import LocationForm from '@/components/location-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import WeatherRecommendations from '@/components/weather-recommendations';
import { createClient } from '@/lib/supabase/server';
import { InfoIcon } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  return (
    <InternalLayout>
      <div className="grid min-h-screen">
        <main className="relative mx-auto max-w-5xl px-6 pb-24 pt-[10vh] sm:pb-32 lg:px-10 w-full">
          <h1 className="text-center font-medium text-4xl xl:text-5xl mt-2 sm:mt-4">
            dressassistant.ai
          </h1>
          <p className="text-muted-foreground mt-4 sm:mt-6 md:mt-8 text-center">
            Enter your location and get clothing recommendations for the next
            seven days based on weather forecasts.
          </p>

          <div className="mt-8 sm:mt-10">
            <LocationForm />
          </div>

          {!isLoggedIn && (
            <div className="mt-4">
              <Alert
                variant="default"
                className="bg-primary/5 border-primary/10"
              >
                <InfoIcon className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm text-muted-foreground">
                  Create a free account to save and access your previous
                  location searches anytime.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="mt-10">
            <WeatherRecommendations />
          </div>
        </main>
      </div>
    </InternalLayout>
  );
}
