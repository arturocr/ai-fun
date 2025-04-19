'use client';

import { useEffect, useState } from 'react';

import { WeatherForecast } from '@/lib/services/weather/types';
import DailyRecommendations from './daily-recommendations';

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
    <DailyRecommendations
      days={forecast.days}
      title={`7-Day Clothing Recommendations for ${forecast.city}, ${forecast.country}`}
      subtitle="Based on the upcoming weather forecast"
    />
  );
}
