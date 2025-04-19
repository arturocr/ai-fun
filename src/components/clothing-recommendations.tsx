'use client';

import { WeatherCastDetails } from '@/lib/services/weather/types';

export interface DayRecommendation {
  date?: string;
  weatherCast?: WeatherCastDetails;
  temperatureMax?: number;
  temperatureMin?: number;
  clothing: string[];
  showWeatherInfo?: boolean;
}

interface ClothingRecommendationsProps {
  recommendations: DayRecommendation;
  compact?: boolean;
}

export default function ClothingRecommendations({
  recommendations,
  compact = false,
}: ClothingRecommendationsProps) {
  if (!recommendations || recommendations.clothing.length === 0) {
    return (
      <p className="text-muted-foreground">No recommendations available.</p>
    );
  }

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {recommendations.date && recommendations.weatherCast && !compact && (
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{recommendations.date}</h3>
          <div className="text-right">
            {recommendations.weatherCast.iconCode && (
              <div className="text-4xl">
                <i className={`qi-${recommendations.weatherCast.iconCode}`}></i>
              </div>
            )}
            {recommendations.temperatureMax !== undefined &&
              recommendations.temperatureMin !== undefined && (
                <div className="font-medium">
                  {Math.round(recommendations.temperatureMax)}° /{' '}
                  {Math.round(recommendations.temperatureMin)}°
                </div>
              )}
            <div className="text-xs text-muted-foreground">
              {recommendations.weatherCast.description}
            </div>
          </div>
        </div>
      )}

      <div>
        {!compact && (
          <h4 className="text-sm font-medium mb-1">Recommended Outfit:</h4>
        )}
        <ul className={`${compact ? 'text-sm' : ''} space-y-1`}>
          {recommendations.clothing.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
