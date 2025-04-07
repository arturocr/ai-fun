export interface LocationResponse {
  city: string;
  country: string;
  lat: number;
  lon: number;
  success: boolean;
  error?: string;
}
