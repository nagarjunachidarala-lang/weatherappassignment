import React from 'react';
import { CurrentWeather, DailyForecast } from '../types';
import { generateActivityRecommendations } from '../utils/weatherUtils';
import { WeatherIcon } from './WeatherIcon';
import { Sparkles, CheckCircle2, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

interface ActivityIntelligenceProps {
  current: CurrentWeather;
  daily?: DailyForecast;
}

export const ActivityIntelligence: React.FC<ActivityIntelligenceProps> = ({
  current,
  daily,
}) => {
  const recommendations = generateActivityRecommendations(current, daily);

  const getStatusBadge = (status: 'optimal' | 'good' | 'caution' | 'poor', score: number) => {
    switch (status) {
      case 'optimal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Optimal ({score}/10)
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Info className="w-3 h-3" />
            Favorable ({score}/10)
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            Caution ({score}/10)
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertOctagon className="w-3 h-3" />
            Adverse ({score}/10)
          </span>
        );
    }
  };

  return (
    <div
      id="activity-intelligence-section"
      className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Activity & Daily Planning Intelligence
            </h3>
            <p className="text-xs text-slate-500">
              Actionable lifestyle guidance adapted to current meteorological factors
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {recommendations.map((rec) => {
          return (
            <div
              key={rec.id}
              id={`activity-card-${rec.id}`}
              className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
                      <WeatherIcon name={rec.icon} className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {rec.title}
                    </h4>
                  </div>
                </div>

                <div>{getStatusBadge(rec.status, rec.score)}</div>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-xs font-semibold text-slate-800">
                  {rec.summary}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {rec.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
