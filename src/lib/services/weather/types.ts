export interface WeatherCastDetails {
  description: string;
  iconCode: string;
}

export interface WeatherDay {
  date: string;
  weatherCast: WeatherCastDetails;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  windSpeed: number;
  clothing: string[];
}

export interface WeatherForecast {
  city: string;
  country: string;
  days: WeatherDay[];
  success: boolean;
  error?: string;
}
