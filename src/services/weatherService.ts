import { GeocodingResponse, GeocodingResult, WeatherApiResponse, SelectedLocation } from '../types';

export const POPULAR_CITIES: SelectedLocation[] = [
  { name: 'San Francisco', region: 'California', country: 'United States', latitude: 37.7749, longitude: -122.4194 },
  { name: 'London', region: 'England', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Tokyo', region: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'New York', region: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 },
  { name: 'Paris', region: 'Île-de-France', country: 'France', latitude: 48.8566, longitude: 2.3522 },
  { name: 'Sydney', region: 'New South Wales', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
];

/**
 * Searches for cities using Open-Meteo Geocoding API
 */
export async function searchCities(query: string, count: number = 5): Promise<GeocodingResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=${count}&language=en&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geocoding failed with status: ${res.status}`);
    }
    const data: GeocodingResponse = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    throw error;
  }
}

/**
 * Fetches current weather and 7-day daily forecast using Open-Meteo API
 */
export async function fetchWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current_weather: 'true',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,windspeed_10m_max,uv_index_max',
    hourly: 'temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m',
    timezone: 'auto',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather forecast request failed with status: ${res.status}`);
    }
    const data: WeatherApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

/**
 * Get user coordinates from browser geolocation API
 */
export function getCurrentCoordinates(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let msg = 'Could not retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}
