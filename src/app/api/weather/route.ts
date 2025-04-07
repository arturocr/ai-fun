import { NextRequest, NextResponse } from 'next/server';

import { getWeatherForecast } from '@/lib/services/weather';

/**
 * Fetches the weather forecast for a given location using the OpenMeteo API.
 * @param request - The request object containing the location data.
 * @returns The weather forecast for the given location.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lon, city, country } = body;

    if (!lat || !lon || !city || !country) {
      return NextResponse.json(
        { error: 'Latitude, longitude, city, and country are required' },
        { status: 400 },
      );
    }

    const weatherData = await getWeatherForecast(
      parseFloat(lat),
      parseFloat(lon),
      city,
      country,
    );

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error processing weather API request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 },
    );
  }
}
