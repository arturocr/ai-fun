import { NextRequest, NextResponse } from 'next/server';

import { parseLocation } from '@/lib/services/location';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location } = body;

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 },
      );
    }

    const locationData = await parseLocation(location);

    return NextResponse.json(locationData);
  } catch (error) {
    console.error('Error processing location API request:', error);
    return NextResponse.json(
      { error: 'Failed to process location' },
      { status: 500 },
    );
  }
}
