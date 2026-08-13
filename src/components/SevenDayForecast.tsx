import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types';
import {
  getWeatherCondition,
  formatTemperature,
  formatDayName,
  formatDateLabel,
} from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Calendar, Droplets } from 'lucide-react';

interface SevenDayForecastProps {
  daily: DailyForecast;
  unit: TemperatureUnit;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({
  daily,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  // Calculate overall global min and max across all 7 days for relative bar styling
  const globalMax = Math.max(...daily.temperature_2m_max);
  const globalMin = Math.min(...daily.temperature_2m_min);
  const totalRange = Math.max(globalMax - globalMin, 1);

  return (
    <div id="seven-day-forecast-section" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            7-Day Meteorological Outlook
          </h3>
        </div>
        <span className="text-xs text-slate-400">Click a card for day details</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {daily.time.slice(0, 7).map((timeStr, idx) => {
          const isToday = idx === 0;
          const isSelected = selectedDayIndex === idx;
          const weatherCode = daily.weathercode[idx];
          const condition = getWeatherCondition(weatherCode);
          const maxTemp = daily.temperature_2m_max[idx];
          const minTemp = daily.temperature_2m_min[idx];
          const precip = daily.precipitation_probability_max?.[idx] ?? 0;

          // Bar positioning calculations
          const leftPercent = ((minTemp - globalMin) / totalRange) * 100;
          const widthPercent = Math.max(((maxTemp - minTemp) / totalRange) * 100, 15);

          return (
            <button
              key={timeStr}
              id={`forecast-day-card-${idx}`}
              type="button"
              onClick={() => onSelectDay(idx)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 relative overflow-hidden ${
                isSelected
                  ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
              }`}
            >
              {isToday && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white leading-none">
                  NOW
                </span>
              )}

              {/* Day & Date Header */}
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {formatDayName(timeStr, isToday)}
                </p>
                <p className="text-xs text-slate-500">{formatDateLabel(timeStr)}</p>
              </div>

              {/* Weather Icon & Condition Name */}
              <div className="my-3 flex flex-col items-center justify-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${condition.badgeBg} ${condition.badgeText} mb-1.5`}
                >
                  <WeatherIcon name={condition.iconName} className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700 truncate max-w-full">
                  {condition.label}
                </p>
                {precip > 20 && (
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-sky-600 mt-0.5">
                    <Droplets className="w-3 h-3" />
                    {precip}%
                  </span>
                )}
              </div>

              {/* Temperature High / Low Numbers */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {formatTemperature(maxTemp, unit)}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {formatTemperature(minTemp, unit)}
                  </span>
                </div>

                {/* Relative Temperature Range Mini-Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400"
                    style={{
                      left: `${Math.max(0, Math.min(leftPercent, 80))}%`,
                      width: `${Math.min(widthPercent, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
