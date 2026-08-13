import React, { useState, useEffect, useCallback } from 'react';
import { SelectedLocation, WeatherApiResponse, TemperatureUnit } from './types';
import { fetchWeather, POPULAR_CITIES } from './services/weatherService';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { SevenDayForecast } from './components/SevenDayForecast';
import { WeatherTrendChart } from './components/WeatherTrendChart';
import { ActivityIntelligence } from './components/ActivityIntelligence';
import {
  AlertCircle,
  RefreshCw,
  CloudSun,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(POPULAR_CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadWeather = useCallback(
    async (location: SelectedLocation, isBackgroundRefresh = false) => {
      if (isBackgroundRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const data = await fetchWeather(location.latitude, location.longitude);
        setWeatherData(data);
        setLastUpdated(new Date());
        setSelectedDayIndex(0);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Failed to fetch weather data. Please check your network connection.';
        setError(msg);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    loadWeather(selectedLocation);
  }, [selectedLocation, loadWeather]);

  const handleSelectLocation = (location: SelectedLocation) => {
    setSelectedLocation(location);
  };

  const handleRefresh = () => {
    if (selectedLocation) {
      loadWeather(selectedLocation, true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Header */}
      <Header
        unit={unit}
        onUnitChange={setUnit}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search & Location Bar */}
        <section aria-label="Location search" className="w-full">
          <SearchBar
            onSelectLocation={handleSelectLocation}
            selectedLocation={selectedLocation}
            isLoading={isLoading && !isRefreshing}
          />
        </section>

        {/* Global Error Banner */}
        {error && (
          <div
            id="global-weather-error"
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold">Weather Service Unavailable</h4>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              id="retry-fetch-btn"
              type="button"
              onClick={() => loadWeather(selectedLocation)}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg text-xs font-semibold self-start sm:self-auto transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Now
            </button>
          </div>
        )}

        {/* Loading Skeleton / Spinner State */}
        {isLoading && !weatherData && !error && (
          <div
            id="weather-loading-state"
            className="w-full py-24 flex flex-col items-center justify-center space-y-4 bg-white rounded-2xl border border-slate-200"
          >
            <div className="relative">
              <CloudSun className="w-12 h-12 text-slate-300 animate-pulse" />
              <Loader2 className="w-6 h-6 text-sky-600 animate-spin absolute bottom-0 right-0" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-slate-800">
                Fetching Real-Time Meteorological Data
              </p>
              <p className="text-xs text-slate-500">
                Connecting to Open-Meteo geocoding and forecast feeds for {selectedLocation.name}...
              </p>
            </div>
          </div>
        )}

        {/* Weather Intelligence Dashboard Content */}
        {weatherData && (
          <div className="space-y-6">
            {/* Primary Current Weather Metrics */}
            <section aria-label="Current weather observation">
              <CurrentWeatherCard
                weather={weatherData}
                location={selectedLocation}
                unit={unit}
              />
            </section>

            {/* 7-Day Meteorological Outlook Cards */}
            <section aria-label="7-day daily forecast">
              <SevenDayForecast
                daily={weatherData.daily}
                unit={unit}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={setSelectedDayIndex}
              />
            </section>

            {/* Weather Trend Charts */}
            <section aria-label="Weather trend visualizations">
              <WeatherTrendChart
                daily={weatherData.daily}
                hourly={weatherData.hourly}
                unit={unit}
                selectedDayIndex={selectedDayIndex}
              />
            </section>

            {/* Activity Intelligence & Daily Planning Recommendations */}
            <section aria-label="Activity and lifestyle planning recommendations">
              <ActivityIntelligence
                current={weatherData.current_weather}
                daily={weatherData.daily}
              />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Powered by Open-Meteo Public Meteorological APIs</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Precision Forecast
            </span>
          </div>
          <div>
            <span>Coordinates: {selectedLocation.latitude.toFixed(3)}°N, {selectedLocation.longitude.toFixed(3)}°E</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
