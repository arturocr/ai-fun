'use client';

import { AlertCircle, LoaderCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

export default function LocationForm() {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { resolvedTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      sessionStorage.removeItem('weatherForecast');
      window.dispatchEvent(new Event('weatherDataUpdated'));

      // Parse the location into coordinates using our API
      const locationResponse = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: location.trim() }),
      });

      const locationData = await locationResponse.json();

      if (!locationData.success) {
        setError(
          locationData.error ||
            'Could not find this location. Please try again.',
        );
        setIsLoading(false);
        return;
      }

      // Get weather forecast for the location using our API
      const weatherResponse = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: locationData.lat,
          lon: locationData.lon,
          city: locationData.city,
          country: locationData.country,
        }),
      });

      const forecast = await weatherResponse.json();

      if (!forecast.success) {
        setError(
          forecast.error || 'Could not fetch weather data. Please try again.',
        );
        setIsLoading(false);
        return;
      }

      // Store forecast in sessionStorage to be accessible by the WeatherRecommendations component
      sessionStorage.setItem('weatherForecast', JSON.stringify(forecast));

      // Trigger a custom event that WeatherRecommendations can listen for
      window.dispatchEvent(new Event('weatherDataUpdated'));

      setIsLoading(false);
    } catch (err) {
      console.error('Error processing location:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-4">Enter Your Location</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Where are you or where are you going?
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, address, or description (e.g. 'The Windy City')"
            className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-2">
            You can be specific or descriptive - we'll figure it out!
          </p>
        </div>

        {error && (
          <Alert
            variant={resolvedTheme === 'light' ? 'destructive' : 'default'}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          variant="default"
          size="lg"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Getting recommendations...</span>
              <span className="animate-spin">
                <LoaderCircle className="w-4 h-4" />
              </span>
            </>
          ) : (
            'Get recommendations'
          )}
        </Button>
      </form>
    </div>
  );
}
