export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  country?: string;
  timezone?: string;
  population?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms?: number;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day?: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max?: number[];
  apparent_temperature_min?: number[];
  precipitation_probability_max?: number[];
  windspeed_10m_max?: number[];
  uv_index_max?: number[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m?: number[];
  apparent_temperature?: number[];
  precipitation_probability?: number[];
  weathercode?: number[];
  windspeed_10m?: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  daily: DailyForecast;
  hourly?: HourlyForecast;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph';

export interface WeatherConditionInfo {
  code: number;
  label: string;
  description: string;
  iconName: string;
  badgeBg: string;
  badgeText: string;
  category: 'clear' | 'cloudy' | 'rain' | 'snow' | 'thunder' | 'fog';
}

export interface ActivityRecommendation {
  id: string;
  title: string;
  category: string;
  status: 'optimal' | 'good' | 'caution' | 'poor';
  score: number; // 1-10
  summary: string;
  detail: string;
  icon: string;
}

export interface SelectedLocation {
  name: string;
  region?: string;
  country?: string;
  latitude: number;
  longitude: number;
}
