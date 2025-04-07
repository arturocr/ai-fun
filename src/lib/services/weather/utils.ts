import { WeatherCastDetails } from './types';

// Map WMO weather codes to descriptions
// Reference: https://open-meteo.com/en/docs
export function getWeatherCast(code: number): WeatherCastDetails {
  const weatherCodes: Record<number, WeatherCastDetails> = {
    0: { description: 'Clear sky', iconCode: '100' },
    1: { description: 'Mainly clear', iconCode: '100' },
    2: { description: 'Partly cloudy', iconCode: '102' },
    3: { description: 'Overcast', iconCode: '104' },
    45: { description: 'Fog', iconCode: '501' },
    48: { description: 'Depositing rime fog', iconCode: '2377' },
    51: { description: 'Light drizzle', iconCode: '309' },
    53: { description: 'Moderate drizzle', iconCode: '312' },
    55: { description: 'Dense drizzle', iconCode: '311' },
    56: {
      description: 'Light freezing drizzle',
      iconCode: '313',
    },
    57: {
      description: 'Dense freezing drizzle',
      iconCode: '313',
    },
    61: { description: 'Slight rain', iconCode: '305' },
    63: { description: 'Moderate rain', iconCode: '306' },
    65: { description: 'Heavy rain', iconCode: '307' },
    66: { description: 'Light freezing rain', iconCode: '404' },
    67: { description: 'Heavy freezing rain', iconCode: '404' },
    71: { description: 'Slight snow fall', iconCode: '400' },
    73: { description: 'Moderate snow fall', iconCode: '401' },
    75: { description: 'Heavy snow fall', iconCode: '402' },
    77: { description: 'Snow grains', iconCode: '401' },
    80: { description: 'Slight rain showers', iconCode: '314' },
    81: {
      description: 'Moderate rain showers',
      iconCode: '315',
    },
    82: {
      description: 'Violent rain showers',
      iconCode: '316',
    },
    85: { description: 'Slight snow showers', iconCode: '408' },
    86: { description: 'Heavy snow showers', iconCode: '410' },
    95: { description: 'Thunderstorm', iconCode: '302' },
    96: {
      description: 'Thunderstorm with slight hail',
      iconCode: '304',
    },
    99: {
      description: 'Thunderstorm with heavy hail',
      iconCode: '1015',
    },
  };

  return weatherCodes[code] || { description: 'Unknown', iconCode: '2212' };
}
