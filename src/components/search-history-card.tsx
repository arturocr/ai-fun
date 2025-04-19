'use client';

import Link from 'next/link';

import { WeatherDay } from '@/lib/services/weather/types';
import { getClothingRecommendations } from '@/lib/services/weather/utils';

interface SearchHistoryCardProps {
  search: {
    id: string;
    created_at: string;
    city: string;
    location: string;
    country: string;
    latitude: number;
    longitude: number;
    weather_data: {
      current?: {
        temperature: number;
        weatherDescription: string;
        weatherCode?: number;
        windSpeed?: number;
        precipitation?: number;
      };
      days?: WeatherDay[];
    };
  };
}

export default function SearchHistoryCard({ search }: SearchHistoryCardProps) {
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
      weatherCode,
    );
  };

  // Days data from search history or generate current recommendation
  const hasForecastDays =
    search.weather_data?.days && search.weather_data.days.length > 0;

  // Get recommendations to display in the card (first day or current)
  const previewRecommendations =
    hasForecastDays && search.weather_data.days
      ? search.weather_data.days[0].clothing.slice(0, 3)
      : getCurrentRecommendations().slice(0, 3);

  return (
    <Link href={`/past-searches/${search.id}`}>
      <div className="p-6 bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="mb-2">
          <span className="text-muted-foreground text-sm">
            {new Date(search.created_at).toLocaleString()}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {search.city || search.location}
        </h3>
        <p className="text-muted-foreground mb-1">{search.country}</p>
        <p className="text-muted-foreground mb-4">
          {search.latitude.toFixed(4)}, {search.longitude.toFixed(4)}
        </p>
        {search.weather_data && search.weather_data.current && (
          <div className="mt-4 p-3 bg-muted rounded">
            <p>Temperature: {search.weather_data.current.temperature}°C</p>
            <p>Condition: {search.weather_data.current.weatherDescription}</p>

            {previewRecommendations.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border">
                <p className="text-sm font-medium mb-1">Top recommendations:</p>
                <ul className="text-xs space-y-1">
                  {previewRecommendations.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-1 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="text-muted-foreground italic text-xs mt-1">
                    Click for more details...
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
