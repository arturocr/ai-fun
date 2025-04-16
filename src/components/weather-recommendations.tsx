'use client';

import { useEffect, useState } from 'react';

import { WeatherForecast } from '@/lib/services/weather';

export default function WeatherRecommendations() {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  useEffect(() => {
    // Try to load forecast from sessionStorage on initial render
    const savedForecast = sessionStorage.getItem('weatherForecast');
    if (savedForecast) {
      try {
        setForecast(JSON.parse(savedForecast));
      } catch (err) {
        console.error('Error parsing saved forecast:', err);
      }
    }

    // Listen for updates from the LocationForm component
    const handleWeatherUpdate = () => {
      const updatedForecast = sessionStorage.getItem('weatherForecast');
      if (updatedForecast) {
        try {
          setForecast(JSON.parse(updatedForecast));
        } catch (err) {
          console.error('Error parsing updated forecast:', err);
        }
      } else {
        setForecast(null);
      }
    };

    window.addEventListener('weatherDataUpdated', handleWeatherUpdate);

    return () => {
      window.removeEventListener('weatherDataUpdated', handleWeatherUpdate);
    };
  }, []);

  if (!forecast) {
    return null; // Don't show anything until we have data
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium">
          7-Day Clothing Recommendations for{' '}
          <strong>
            {forecast.city}, {forecast.country}
          </strong>
        </h2>
        <p className="text-muted-foreground mt-1">
          Based on the upcoming weather forecast
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {forecast.days.map((day) => (
          <div
            key={day.date}
            className="rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition hover:scale-102"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{day.date}</h3>
              <div className="text-right">
                <div className="text-4xl">
                  <i className={`qi-${day.weatherCast.iconCode}`}></i>
                </div>
                <div className="font-medium">
                  {Math.round(day.temperatureMax)}° /{' '}
                  {Math.round(day.temperatureMin)}°
                </div>
                <div className="text-xs text-muted-foreground">
                  {day.weatherCast.description}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h4 className="text-sm font-medium mb-1">Recommended Outfit:</h4>
              <ul className="text-sm space-y-1">
                {day.clothing.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
