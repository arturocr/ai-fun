/**
 * Weather service to fetch forecast data and generate clothing recommendations
 * Uses Open-Meteo API which is free and open-source
 */

import { getClothingRecommendations } from '@/utils';
import { WeatherCastDetails } from './types';
import { getWeatherCast } from './utils';

export interface WeatherDay {
  date: string;
  weatherCast: WeatherCastDetails;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  windSpeed: number;
  clothing: string[];
}

export interface WeatherForecast {
  city: string;
  country: string;
  days: WeatherDay[];
  success: boolean;
  error?: string;
}

export async function getWeatherForecast(
  lat: number,
  lon: number,
  city: string,
  country: string,
): Promise<WeatherForecast> {
  try {
    if (!process.env.OPENMETEO_API_URL) {
      throw new Error('OPENMETEO_API_URL is not set in environment variables');
    }

    // OpenMeteo is a free and open-source weather API
    const response = await fetch(
      `${process.env.OPENMETEO_API_URL}?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timeformat=unixtime&forecast_days=7&timezone=auto`,
    );

    if (!response.ok) {
      throw new Error(`Weather API error! status: ${response.status}`);
    }

    const data = await response.json();

    // Process the data into our format
    const days: WeatherDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(data.daily.time[i] * 1000).toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        },
      );

      const weatherCode = data.daily.weathercode[i];
      const weatherCast = getWeatherCast(weatherCode);
      const temperatureMax = data.daily.temperature_2m_max[i];
      const temperatureMin = data.daily.temperature_2m_min[i];
      const precipitation = data.daily.precipitation_sum[i];
      const windSpeed = data.daily.windspeed_10m_max[i];

      // Generate clothing recommendations based on weather parameters
      const clothing = getClothingRecommendations(
        temperatureMax,
        temperatureMin,
        precipitation,
        windSpeed,
        weatherCode,
      );

      days.push({
        date,
        weatherCast,
        temperatureMax,
        temperatureMin,
        precipitation,
        windSpeed,
        clothing,
      });
    }

    return {
      city,
      country,
      days,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return {
      city: '',
      country: '',
      days: [],
      success: false,
      error: 'Failed to fetch weather forecast. Please try again later.',
    };
  }
}
