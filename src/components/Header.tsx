import React from 'react';
import { TemperatureUnit } from '../types';
import { CloudSun, RotateCw, Sparkles } from 'lucide-react';

interface HeaderProps {
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onUnitChange,
  onRefresh,
  isRefreshing,
  lastUpdated,
}) => {
  const formattedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-sky-500/20">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                  Weather Intelligence
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
                  <Sparkles className="w-3 h-3" />
                  Live API
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Open-Meteo Geocoding & High-Precision Meteorological Forecasting
              </p>
            </div>
          </div>

          {/* Mobile Right Action Area (if needed) */}
        </div>

        {/* Global Controls: Unit Switcher & Refresh */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {formattedTime && (
            <span className="text-xs text-slate-500 hidden md:inline-block">
              Updated {formattedTime}
            </span>
          )}

          {/* Unit Toggle */}
          <div
            id="unit-toggle"
            className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200"
            role="group"
            aria-label="Temperature unit selector"
          >
            <button
              id="unit-celsius-btn"
              type="button"
              onClick={() => onUnitChange('celsius')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'celsius'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              type="button"
              onClick={() => onUnitChange('fahrenheit')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === 'fahrenheit'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-weather-btn"
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh current meteorological data"
          >
            <RotateCw
              className={`w-4 h-4 text-slate-700 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
