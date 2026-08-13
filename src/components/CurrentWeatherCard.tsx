import React from 'react';
import { WeatherApiResponse, SelectedLocation, TemperatureUnit } from '../types';
import {
  getWeatherCondition,
  formatTemperature,
  formatWindSpeed,
  getWindDirection,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import {
  Compass,
  Droplets,
  Wind,
  Thermometer,
  ArrowDown,
  ArrowUp,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: WeatherApiResponse;
  location: SelectedLocation;
  unit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  location,
  unit,
}) => {
  const current = weather.current_weather;
  const condition = getWeatherCondition(current.weathercode);
  const todayMax = weather.daily?.temperature_2m_max?.[0] ?? current.temperature;
  const todayMin = weather.daily?.temperature_2m_min?.[0] ?? current.temperature;
  const apparentTemp =
    weather.hourly?.apparent_temperature?.[0] ??
    weather.daily?.apparent_temperature_max?.[0] ??
    current.temperature;
  const humidity = weather.hourly?.relativehumidity_2m?.[0] ?? 62;
  const precipProb = weather.daily?.precipitation_probability_max?.[0] ?? 0;
  const uvIndex = weather.daily?.uv_index_max?.[0] ?? 4;
  const windCompass = getWindDirection(current.winddirection);

  return (
    <div
      id="current-weather-dashboard"
      className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs relative overflow-hidden"
    >
      {/* Subtle ambient accent background */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Primary Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold tracking-wider uppercase mb-1">
              <span>Current Observation</span>
              <span>•</span>
              <span>{weather.timezone_abbreviation || 'Local Time'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {location.name}
            </h2>
            <p className="text-sm text-slate-500">
              {[location.region, location.country].filter(Boolean).join(', ') ||
                `Coordinates: ${weather.latitude.toFixed(2)}°, ${weather.longitude.toFixed(2)}°`}
            </p>
          </div>

          {/* Condition Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-2xs">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${condition.badgeBg} ${condition.badgeText}`}
            >
              <WeatherIcon name={condition.iconName} className="w-4 h-4 shrink-0" />
              {condition.label}
            </span>
            <span className="text-slate-600 hidden sm:inline">{condition.description}</span>
          </div>

          {/* Hero Temperature */}
          <div className="flex items-baseline gap-4 pt-1">
            <div className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-sans">
              {formatTemperature(current.temperature, unit)}
            </div>

            <div className="flex flex-col gap-1 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-slate-400" />
                Feels like{' '}
                <strong className="text-slate-700 font-semibold">
                  {formatTemperature(apparentTemp, unit)}
                </strong>
              </span>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="flex items-center gap-0.5 text-red-600 font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  {formatTemperature(todayMax, unit)}
                </span>
                <span>/</span>
                <span className="flex items-center gap-0.5 text-blue-600 font-semibold">
                  <ArrowDown className="w-3 h-3" />
                  {formatTemperature(todayMin, unit)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Weather Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
          {/* Wind Speed & Direction */}
          <div
            id="metric-wind"
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Wind</span>
              <Wind className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-bold text-slate-900">
                {formatWindSpeed(current.windspeed, unit)}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Compass className="w-3 h-3 text-slate-400" />
                {windCompass} ({current.winddirection}°)
              </p>
            </div>
          </div>

          {/* Humidity */}
          <div
            id="metric-humidity"
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Humidity</span>
              <Droplets className="w-4 h-4 text-sky-500" />
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-bold text-slate-900">{humidity}%</p>
              <p className="text-xs text-slate-500">
                {humidity > 70 ? 'High moisture' : humidity < 35 ? 'Dry air' : 'Comfortable'}
              </p>
            </div>
          </div>

          {/* Precipitation Chance */}
          <div
            id="metric-precip"
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Precip Chance</span>
              <Droplets className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-bold text-slate-900">{precipProb}%</p>
              <p className="text-xs text-slate-500">
                {precipProb > 50 ? 'Rain expected' : 'Low risk'}
              </p>
            </div>
          </div>

          {/* UV Index */}
          <div
            id="metric-uv"
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">UV Index</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-bold text-slate-900">{uvIndex.toFixed(1)}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                {uvIndex >= 8 ? 'Very High' : uvIndex >= 6 ? 'High' : uvIndex >= 3 ? 'Moderate' : 'Low'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
