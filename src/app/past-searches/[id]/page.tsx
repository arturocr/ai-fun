import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import DailyRecommendations from "@/components/daily-recommendations";
import InternalLayout from "@/components/internal-layout";
import { Button } from "@/components/ui/button";
import { getClothingRecommendations } from "@/lib/services/weather/utils";
import { createClient } from "@/lib/supabase/server";

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Check user authentication
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  // Fetch the search history entry
  const { data: search, error: searchError } = await supabase
    .from("search_history")
    .select("*")
    .eq("id", id)
    .single();

  // Handle errors
  if (searchError || !search) {
    notFound();
  }

  // Check if this search belongs to the current user
  if (search.user_id !== userData.user.id) {
    redirect("/past-searches");
  }

  // Generate recommendations for current weather if days aren't available
  const getCurrentRecommendations = () => {
    if (!search.weather_data?.current) return [];

    const current = search.weather_data.current;
    const temperature = current.temperature;
    const weatherCode = current.weatherCode || 0;
    const windSpeed = current.windSpeed || 0;
    const precipitation = current.precipitation || 0;

    return getClothingRecommendations(
      temperature,
      temperature,
      precipitation,
      windSpeed,
      weatherCode
    );
  };

  // Check if we have forecast days data
  const hasForecastDays =
    search.weather_data?.days && search.weather_data.days.length > 0;

  return (
    <InternalLayout>
      <div className="container max-w-5xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/past-searches">← Back to history</Link>
            </Button>
            <h1 className="text-3xl font-bold">
              Clothing Recommendations for {search.city || search.location}
            </h1>
            <p className="text-muted-foreground mt-1">
              {search.country} • Searched on{" "}
              {new Date(search.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {hasForecastDays ? (
          <DailyRecommendations
            days={search.weather_data.days || null}
            subtitle={`Based on the weather forecast for ${
              search.city || search.location
            }, ${search.country}`}
          />
        ) : (
          <div className="p-6 bg-background border border-border rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4">
              Current Weather Recommendations
            </h2>
            <div className="mb-4">
              <p className="font-medium">
                Temperature: {search.weather_data.current.temperature}°C
              </p>
              <p>Condition: {search.weather_data.current.weatherDescription}</p>
            </div>

            <h3 className="text-lg font-medium mb-2">Recommended Outfit:</h3>
            <ul className="space-y-2">
              {getCurrentRecommendations().map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </InternalLayout>
  );
}
