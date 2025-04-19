'use client';

import { WeatherDay } from '@/lib/services/weather/types';
import ClothingRecommendations from './clothing-recommendations';

interface DailyRecommendationsProps {
  days: WeatherDay[] | null;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

export default function DailyRecommendations({
  days,
  compact = false,
  title,
  subtitle,
}: DailyRecommendationsProps) {
  if (!days || days.length === 0) {
    return (
      <div className="p-6 bg-background border border-border rounded-lg shadow-sm">
        <p className="text-muted-foreground">No forecast data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center">
          {title && <h2 className="text-2xl font-medium">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}

      <div
        className={`grid gap-4 ${
          compact ? '' : 'sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {days.map((day) => (
          <div
            key={day.date}
            className={`${
              compact ? '' : 'rounded-lg border border-border p-4 shadow-sm'
            }`}
          >
            <ClothingRecommendations
              recommendations={{
                date: day.date,
                weatherCast: day.weatherCast,
                temperatureMax: day.temperatureMax,
                temperatureMin: day.temperatureMin,
                clothing: day.clothing,
              }}
              compact={compact}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
