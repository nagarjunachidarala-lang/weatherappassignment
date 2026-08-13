import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DailyForecast, HourlyForecast, TemperatureUnit } from '../types';
import {
  formatDayName,
  formatDateLabel,
  formatTemperatureValue,
  getWeatherCondition,
} from '../utils/weatherUtils';
import { TrendingUp, Clock } from 'lucide-react';

interface WeatherTrendChartProps {
  daily: DailyForecast;
  hourly?: HourlyForecast;
  unit: TemperatureUnit;
  selectedDayIndex: number;
}

type ChartViewMode = 'daily' | 'hourly';

export const WeatherTrendChart: React.FC<WeatherTrendChartProps> = ({
  daily,
  hourly,
  unit,
  selectedDayIndex,
}) => {
  const [viewMode, setViewMode] = useState<ChartViewMode>('daily');

  // Prepare Daily Data
  const dailyData = daily.time.slice(0, 7).map((dateStr, idx) => {
    const isToday = idx === 0;
    const maxVal = formatTemperatureValue(daily.temperature_2m_max[idx], unit);
    const minVal = formatTemperatureValue(daily.temperature_2m_min[idx], unit);
    const condition = getWeatherCondition(daily.weathercode[idx]);
    const precip = daily.precipitation_probability_max?.[idx] ?? 0;

    return {
      name: formatDayName(dateStr, isToday),
      date: formatDateLabel(dateStr),
      maxTemp: maxVal,
      minTemp: minVal,
      condition: condition.label,
      precip: precip,
      rawDate: dateStr,
      isHighlighted: selectedDayIndex === idx,
    };
  });

  // Prepare Hourly Data (next 24 hours)
  const hourlyData = (hourly?.time || []).slice(0, 24).map((timeStr, idx) => {
    const dateObj = new Date(timeStr);
    const hourLabel = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    const tempVal = formatTemperatureValue(hourly?.temperature_2m[idx] ?? 0, unit);
    const apparentVal = formatTemperatureValue(hourly?.apparent_temperature?.[idx] ?? 0, unit);
    const code = hourly?.weathercode?.[idx] ?? 0;
    const condition = getWeatherCondition(code);
    const rainChance = hourly?.precipitation_probability?.[idx] ?? 0;

    return {
      name: hourLabel,
      time: hourLabel,
      temp: tempVal,
      apparent: apparentVal,
      condition: condition.label,
      precip: rainChance,
    };
  });

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div
      id="weather-chart-container"
      className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4"
    >
      {/* Chart Controls & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Temperature Dynamics & Trend
            </h3>
            <p className="text-xs text-slate-500">
              {viewMode === 'daily'
                ? '7-Day High and Low temperature trajectory'
                : '24-Hour hourly forecast trajectory'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            id="chart-view-daily-btn"
            type="button"
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'daily'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7-Day Daily
          </button>
          {hourly && hourly.time && hourly.time.length > 0 && (
            <button
              id="chart-view-hourly-btn"
              type="button"
              onClick={() => setViewMode('hourly')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'hourly'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3 h-3" />
              24-Hour
            </button>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'daily' ? (
            <AreaChart
              data={dailyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMaxTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorMinTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              />

              <YAxis
                unit={unitSymbol}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                domain={['auto', 'auto']}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-xl space-y-1 border border-slate-700">
                        <div className="flex items-center justify-between gap-4 font-bold border-b border-slate-700 pb-1">
                          <span>
                            {data.name} ({data.date})
                          </span>
                          <span className="text-sky-300">{data.condition}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-slate-300">
                          <span className="flex items-center gap-1 text-orange-400">
                            ● High Temp:
                          </span>
                          <span className="font-semibold text-white">
                            {data.maxTemp}
                            {unitSymbol}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-slate-300">
                          <span className="flex items-center gap-1 text-sky-400">
                            ● Low Temp:
                          </span>
                          <span className="font-semibold text-white">
                            {data.minTemp}
                            {unitSymbol}
                          </span>
                        </div>
                        {data.precip > 0 && (
                          <div className="flex items-center justify-between gap-4 text-slate-300 pt-0.5">
                            <span>Precipitation:</span>
                            <span className="font-semibold text-sky-300">
                              {data.precip}%
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: 8, fontSize: 12 }}
                formatter={(value) => {
                  return value === 'maxTemp'
                    ? `Max Temperature (${unitSymbol})`
                    : `Min Temperature (${unitSymbol})`;
                }}
              />

              <Area
                type="monotone"
                dataKey="maxTemp"
                name="maxTemp"
                stroke="#ea580c"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMaxTemp)"
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />

              <Area
                type="monotone"
                dataKey="minTemp"
                name="minTemp"
                stroke="#0284c7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorMinTemp)"
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <AreaChart
              data={hourlyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHourlyTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                tick={{ fill: '#64748b', fontSize: 11 }}
                interval={2}
              />

              <YAxis
                unit={unitSymbol}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                domain={['auto', 'auto']}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-xl space-y-1 border border-slate-700">
                        <div className="flex items-center justify-between gap-4 font-bold border-b border-slate-700 pb-1">
                          <span>{data.time}</span>
                          <span className="text-sky-300">{data.condition}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-slate-300">
                          <span>Temperature:</span>
                          <span className="font-semibold text-white">
                            {data.temp}
                            {unitSymbol}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-slate-300">
                          <span>Feels Like:</span>
                          <span className="font-semibold text-slate-200">
                            {data.apparent}
                            {unitSymbol}
                          </span>
                        </div>
                        {data.precip > 0 && (
                          <div className="flex items-center justify-between gap-4 text-slate-300">
                            <span>Precipitation Chance:</span>
                            <span className="font-semibold text-sky-300">
                              {data.precip}%
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="temp"
                name={`Temperature (${unitSymbol})`}
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHourlyTemp)"
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
