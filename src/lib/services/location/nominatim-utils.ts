import { LocationResponse } from './types';

/**
 * Gets the geographic coordinates of a location using the Nominatim API.
 * @param locationString - The location string to geocode.
 * @returns The geographic coordinates of the location.
 */
export async function getNominatimLocation(
  locationString: string,
): Promise<LocationResponse> {
  try {
    // Use Nominatim API (OpenStreetMap data) which is free and open source
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        locationString,
      )}&format=json&limit=1&accept-language=en`,
      {
        headers: {
          'User-Agent': 'dressassistant.ai/1.0', // OSM requires a user agent
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      return {
        city: '',
        country: '',
        lat: 0,
        lon: 0,
        success: false,
        error:
          'Location not found, trying something more specific or descriptive',
      };
    }

    const result = data[0];

    // Extract city and country from display name
    // The display name format is typically: "City, State, Country"
    const displayParts = result.display_name.split(', ');
    const city = displayParts[0];
    const country = displayParts[displayParts.length - 1];

    return {
      city,
      country,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      success: true,
    };
  } catch (error) {
    console.error('Error in direct geocoding:', error);
    return {
      city: '',
      country: '',
      lat: 0,
      lon: 0,
      success: false,
      error: 'Failed to geocode location',
    };
  }
}
