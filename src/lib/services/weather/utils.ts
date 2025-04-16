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

// Generate clothing recommendations based on weather conditions
export function getClothingRecommendations(
  maxTemp: number,
  minTemp: number,
  precipitation: number,
  windSpeed: number,
  weatherCode: number,
): string[] {
  const recommendations: string[] = [];

  // Temperature recommendations (in Celsius)
  const avgTemp = (maxTemp + minTemp) / 2;

  // Top clothing based on temperature
  if (avgTemp < 0) {
    recommendations.push('Heavy winter coat');
    recommendations.push('Thermal layer');
    recommendations.push('Sweater');
  } else if (avgTemp < 10) {
    recommendations.push('Winter coat');
    recommendations.push('Sweater or hoodie');
  } else if (avgTemp < 15) {
    recommendations.push('Light jacket or coat');
    recommendations.push('Long sleeve shirt');
  } else if (avgTemp < 20) {
    recommendations.push('Light jacket or cardigan');
    recommendations.push('Long sleeve shirt or t-shirt');
  } else if (avgTemp < 25) {
    recommendations.push('T-shirt');
    recommendations.push('Light cardigan (for evening)');
  } else {
    recommendations.push('T-shirt or tank top');
    recommendations.push('Light, breathable fabrics');
  }

  // Bottom clothing based on temperature
  if (avgTemp < 5) {
    recommendations.push('Insulated pants');
  } else if (avgTemp < 15) {
    recommendations.push('Pants or jeans');
  } else if (avgTemp < 25) {
    recommendations.push('Pants, jeans, or skirt');
  } else {
    recommendations.push('Shorts, skirt, or light pants');
  }

  // Footwear based on temperature and precipitation
  if (avgTemp < 5) {
    recommendations.push('Insulated winter boots');
  } else if (
    precipitation > 5 ||
    [61, 63, 65, 80, 81, 82].includes(weatherCode)
  ) {
    recommendations.push('Waterproof shoes or boots');
  } else if (avgTemp > 20) {
    recommendations.push('Light shoes or sandals');
  } else {
    recommendations.push('Comfortable walking shoes');
  }

  // Accessories based on conditions
  if (avgTemp < 5) {
    recommendations.push('Hat, gloves, and scarf');
  } else if (avgTemp < 10) {
    recommendations.push('Light hat and gloves');
  }

  // Rain gear
  if (
    precipitation > 0 ||
    [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)
  ) {
    if (precipitation > 5 || [55, 65, 82].includes(weatherCode)) {
      recommendations.push('Waterproof rain jacket');
      recommendations.push('Umbrella');
    } else {
      recommendations.push('Water-resistant jacket or umbrella');
    }
  }

  // Sun protection
  if ([0, 1].includes(weatherCode) && avgTemp > 15) {
    recommendations.push('Sunglasses');
    recommendations.push('Sunscreen');
    if (avgTemp > 25) {
      recommendations.push('Hat or cap for sun protection');
    }
  }

  // Wind protection
  if (windSpeed > 30) {
    recommendations.push('Windproof jacket');
  } else if (windSpeed > 20) {
    recommendations.push('Wind-resistant layer');
  }

  return recommendations;
}
