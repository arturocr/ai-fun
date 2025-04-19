import { NextRequest, NextResponse } from 'next/server';

import { getWeatherForecast } from '@/lib/services/weather';
import { createClient } from '@/lib/supabase/server';

/**
 * Fetches the weather forecast for a given location using the OpenMeteo API.
 * @param request - The request object containing the location data.
 * @returns The weather forecast for the given location.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lon, city, country, location_input } = body;

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

    // Get supabase client
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: userData } = await supabase.auth.getUser();

    // If user is authenticated, save search history (prevent duplicates)
    if (userData?.user) {
      try {
        console.log(userData.user.id);
        console.log(parseFloat(lat));
        console.log(parseFloat(lon));
        // Check if this exact location already exists in user's history
        const { data: existingSearch } = await supabase
          .from('search_history')
          .select('id')
          .eq('user_id', userData.user.id)
          .eq('latitude', parseFloat(lat))
          .eq('longitude', parseFloat(lon))
          .single();
        console.log(existingSearch);
        // Only insert if no duplicate found
        if (!existingSearch) {
          await supabase.from('search_history').insert({
            user_id: userData.user.id,
            location: location_input || city, // Use the original input if available
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            city,
            country,
            weather_data: weatherData,
          });
        }
      } catch (err) {
        console.error('Error saving search history:', err);
        // Don't return error to client, just log it
      }
    }

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error processing weather API request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 },
    );
  }
}
