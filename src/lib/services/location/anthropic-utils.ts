import Anthropic from '@anthropic-ai/sdk';
import { getNominatimLocation } from './nominatim-utils';
import { LocationResponse } from './types';

/**
 * Uses Anthropic's Claude API to parse user location descriptions and get geographic coordinates.
 * @param description - The user's description of a location.
 * @returns The geographic coordinates of the user's location.
 */
export async function parseDescriptiveLocation(
  description: string,
): Promise<LocationResponse> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
    }

    if (!process.env.ANTHROPIC_MODEL) {
      throw new Error('ANTHROPIC_MODEL is not set in environment variables');
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `
            I need to extract a specific city and country name from this possibly descriptive or ambiguous location: "${description}"
            Examples:
            - "the windy city" → Chicago, United States
            - "silicon valley" → San Jose, United States
            - "city of lights" → Paris, France
            - "the big apple" → New York, United States
            - "sin city" → Las Vegas, United States
            - "the big easy" → New Orleans, United States

            Important: Always provide names in English, even if the location has different names in other languages.
            For example: "München" should be "Munich, Germany", "北京" should be "Beijing, China".

            Please respond in this exact JSON format with nothing else:
            {
              "city": "[city name in English]",
              "country": "[country name in English]",
              "lat": [latitude],
              "lon": [longitude],
              "success": [true | false depending on if the location was found],
              "error": "[error message if the location was not found]"
            }
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

    const content = textBlock.text;

    return JSON.parse(content);
  } catch (error) {
    console.error('Error in descriptive location parsing:', error);
    // As a fallback, try direct geocoding
    return await getNominatimLocation(description);
  }
}
