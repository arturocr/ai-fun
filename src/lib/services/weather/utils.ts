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
export async function getClothingRecommendations(
  maxTemp: number,
  minTemp: number,
  precipitation: number,
  windSpeed: number,
  weatherCode: number,
): Promise<string[]> {
  // Get hardcoded recommendations as fallback
  const hardcodedRecommendations = getHardcodedRecommendations(
    maxTemp,
    minTemp,
    precipitation,
    windSpeed,
    weatherCode,
  );

  try {
    // Try to get AI-generated recommendations
    const aiRecommendations = await getAIRecommendations(
      maxTemp,
      minTemp,
      precipitation,
      windSpeed,
      weatherCode,
    );

    // Return AI recommendations if available
    if (aiRecommendations.length > 0) {
      return aiRecommendations;
    }

    // Fallback to hardcoded recommendations
    return hardcodedRecommendations;
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    // Return hardcoded recommendations as fallback
    return hardcodedRecommendations;
  }
}

// Get AI-generated clothing recommendations
async function getAIRecommendations(
  maxTemp: number,
  minTemp: number,
  precipitation: number,
  windSpeed: number,
  weatherCode: number,
): Promise<string[]> {
  try {
    // Check if Anthropic API key is available
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
    }

    if (!process.env.RECOMMENDATIONS_ANTHROPIC_MODEL) {
      throw new Error(
        'RECOMMENDATIONS_ANTHROPIC_MODEL is not set in environment variables',
      );
    }

    // Import Anthropic dynamically to avoid server-side issues
    const { default: Anthropic } = await import('@anthropic-ai/sdk');

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const avgTemp = (maxTemp + minTemp) / 2;

    // Get weather description
    const weatherDescription = getWeatherDescription(weatherCode);

    const message = await anthropic.messages.create({
      model: process.env.RECOMMENDATIONS_ANTHROPIC_MODEL,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `
            I need specific clothing recommendations for the following weather conditions:
            - Average temperature: ${avgTemp}°C (max: ${maxTemp}°C, min: ${minTemp}°C)
            - Precipitation: ${precipitation}mm
            - Wind speed: ${windSpeed}km/h
            - Weather condition: ${weatherDescription}

            Please provide 6-8 practical clothing item recommendations that would be suitable for these exact weather conditions. Be specific with clothing types and materials where relevant.

            Format your response as a JSON array of strings with clothing items only, nothing else:
            ["item1", "item2", "item3", ...]
          `,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text') as
      | { type: 'text'; text: string }
      | undefined;

    if (!textBlock) {
      throw new Error('No text content found in Anthropic response');
    }

    const content = textBlock.text.trim();
    return JSON.parse(content);
  } catch (error) {
    console.error('Error in AI recommendations:', error);
    return [];
  }
}

// Get descriptive weather condition from code
function getWeatherDescription(weatherCode: number): string {
  // WMO Weather interpretation codes (WW)
  const weatherDescriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return weatherDescriptions[weatherCode] || 'Unknown weather condition';
}

// Original hardcoded recommendations logic
function getHardcodedRecommendations(
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
