import { parseDescriptiveLocation } from './anthropic-utils';
import { getNominatimLocation } from './nominatim-utils';
import { LocationResponse } from './types';

/**
 * Parses the user's location input and returns the geographic coordinates.
 * @param userInput - The user's location input, it can be descriptive or structured.
 * @returns The geographic coordinates of the user's location.
 */
export async function parseLocation(
  userInput: string,
): Promise<LocationResponse> {
  try {
    // First, try direct geocoding using Nominatim (OpenStreetMap data)
    // This works for standard location formats like "Boston" or "Denver, CO"
    const directResult = await getNominatimLocation(userInput);

    if (directResult.success) {
      return directResult;
    }

    // If direct geocoding fails, try with Anthropic API to handle
    // descriptive or indirect references like "the windy city" or "silicon valley"
    const descriptiveLocation = await parseDescriptiveLocation(userInput);

    return descriptiveLocation;
  } catch (error) {
    console.error('Error parsing location:', error);
    return {
      city: '',
      country: '',
      lat: 0,
      lon: 0,
      success: false,
      error:
        'Failed to parse location. Please try again with a more specific location.',
    };
  }
}
