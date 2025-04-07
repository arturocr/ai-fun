import LocationForm from '@/components/location-form';
import WeatherRecommendations from '@/components/weather-recommendations';

export default function Home() {
  return (
    <div className="grid bg-background min-h-screen">
      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-[10vh] sm:pb-32 lg:px-10 w-full">
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

        <div className="mt-10">
          <WeatherRecommendations />
        </div>
      </main>
    </div>
  );
}
