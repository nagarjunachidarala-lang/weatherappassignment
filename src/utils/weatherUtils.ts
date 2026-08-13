import {
  WeatherConditionInfo,
  ActivityRecommendation,
  CurrentWeather,
  DailyForecast,
  TemperatureUnit,
} from '../types';

export const WMO_WEATHER_MAP: Record<number, WeatherConditionInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    description: 'Bright sunshine and unclouded sky',
    iconName: 'Sun',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    category: 'clear',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    description: 'Mostly sunny with scattered faint clouds',
    iconName: 'SunMedium',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    category: 'clear',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    description: 'Scattered clouds with generous sun breaks',
    iconName: 'CloudSun',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-300',
    category: 'cloudy',
  },
  3: {
    code: 3,
    label: 'Overcast',
    description: 'Dense cloud cover spanning the sky',
    iconName: 'Cloud',
    badgeBg: 'bg-slate-100 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    category: 'cloudy',
  },
  45: {
    code: 45,
    label: 'Foggy',
    description: 'Reduced horizontal visibility in fog',
    iconName: 'CloudFog',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700',
    badgeText: 'text-zinc-800 dark:text-zinc-300',
    category: 'fog',
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    description: 'Icy mist and low freezing visibility',
    iconName: 'CloudFog',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    category: 'fog',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    description: 'Fine, gentle droplets falling steadily',
    iconName: 'CloudDrizzle',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    category: 'rain',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    description: 'Steady mist and light precipitation',
    iconName: 'CloudDrizzle',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    category: 'rain',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    description: 'Heavy damp drizzle with low mist',
    iconName: 'CloudDrizzle',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700',
    badgeText: 'text-blue-900 dark:text-blue-200',
    category: 'rain',
  },
  56: {
    code: 56,
    label: 'Light Freezing Drizzle',
    description: 'Cold drizzle freezing on contact surfaces',
    iconName: 'CloudHail',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    category: 'snow',
  },
  57: {
    code: 57,
    label: 'Dense Freezing Drizzle',
    description: 'Hazardous icy glaze drizzle',
    iconName: 'CloudHail',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/40 border-cyan-300 dark:border-cyan-700',
    badgeText: 'text-cyan-900 dark:text-cyan-200',
    category: 'snow',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    description: 'Intermittent light rain showers',
    iconName: 'CloudRain',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    category: 'rain',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    description: 'Steady soaking rainfall throughout the area',
    iconName: 'CloudRain',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700',
    badgeText: 'text-blue-900 dark:text-blue-200',
    category: 'rain',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    description: 'Intense, heavy downpour with puddles',
    iconName: 'CloudRainWind',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700',
    badgeText: 'text-indigo-900 dark:text-indigo-200',
    category: 'rain',
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    description: 'Icy precipitation causing slippery paths',
    iconName: 'CloudSnow',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    category: 'snow',
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    description: 'Severe freezing precipitation hazard',
    iconName: 'CloudSnow',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700',
    badgeText: 'text-cyan-900 dark:text-cyan-200',
    category: 'snow',
  },
  71: {
    code: 71,
    label: 'Slight Snowfall',
    description: 'Light fluttering snowflakes',
    iconName: 'Snowflake',
    badgeBg: 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    category: 'snow',
  },
  73: {
    code: 73,
    label: 'Moderate Snow',
    description: 'Steady accumulating snowfall',
    iconName: 'Snowflake',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-900 dark:text-sky-200',
    category: 'snow',
  },
  75: {
    code: 75,
    label: 'Heavy Snowfall',
    description: 'Deep snow accumulation and low visibility',
    iconName: 'Snowflake',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/50 border-sky-300 dark:border-sky-700',
    badgeText: 'text-sky-900 dark:text-sky-100',
    category: 'snow',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    description: 'Small crisp white opaque ice grains',
    iconName: 'Snowflake',
    badgeBg: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    category: 'snow',
  },
  80: {
    code: 80,
    label: 'Light Showers',
    description: 'Passing brief rain showers',
    iconName: 'CloudRain',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    category: 'rain',
  },
  81: {
    code: 81,
    label: 'Moderate Showers',
    description: 'Frequent rain bursts with brief clearing',
    iconName: 'CloudRain',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700',
    badgeText: 'text-blue-900 dark:text-blue-200',
    category: 'rain',
  },
  82: {
    code: 82,
    label: 'Violent Showers',
    description: 'Torrential localized downpours',
    iconName: 'CloudRainWind',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700',
    badgeText: 'text-indigo-900 dark:text-indigo-200',
    category: 'rain',
  },
  85: {
    code: 85,
    label: 'Light Snow Showers',
    description: 'Intermittent snow flurries',
    iconName: 'Snowflake',
    badgeBg: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    category: 'snow',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    description: 'Sudden intense snow squalls',
    iconName: 'Snowflake',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/50 border-sky-300 dark:border-sky-700',
    badgeText: 'text-sky-900 dark:text-sky-100',
    category: 'snow',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    description: 'Lightning, thunder, and gusty winds',
    iconName: 'CloudLightning',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/50 border-purple-300 dark:border-purple-700',
    badgeText: 'text-purple-900 dark:text-purple-200',
    category: 'thunder',
  },
  96: {
    code: 96,
    label: 'Thunderstorm w/ Light Hail',
    description: 'Thunderstorm accompanied by small ice pellets',
    iconName: 'CloudHail',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/50 border-purple-300 dark:border-purple-700',
    badgeText: 'text-purple-900 dark:text-purple-200',
    category: 'thunder',
  },
  99: {
    code: 99,
    label: 'Severe Thunderstorm w/ Heavy Hail',
    description: 'Dangerous storm with strong hail and wind',
    iconName: 'CloudLightning',
    badgeBg: 'bg-red-100 dark:bg-red-950/50 border-red-300 dark:border-red-700',
    badgeText: 'text-red-900 dark:text-red-200',
    category: 'thunder',
  },
};

export function getWeatherCondition(code: number): WeatherConditionInfo {
  return (
    WMO_WEATHER_MAP[code] || {
      code,
      label: 'Variable',
      description: 'Typical mixed regional conditions',
      iconName: 'Cloud',
      badgeBg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      badgeText: 'text-slate-800 dark:text-slate-200',
      category: 'cloudy',
    }
  );
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function formatTemperature(
  tempCelsius: number,
  unit: TemperatureUnit = 'celsius'
): string {
  if (unit === 'fahrenheit') {
    return `${celsiusToFahrenheit(tempCelsius)}°F`;
  }
  return `${Math.round(tempCelsius)}°C`;
}

export function formatTemperatureValue(
  tempCelsius: number,
  unit: TemperatureUnit = 'celsius'
): number {
  if (unit === 'fahrenheit') {
    return celsiusToFahrenheit(tempCelsius);
  }
  return Math.round(tempCelsius);
}

export function formatWindSpeed(
  speedKmh: number,
  unit: TemperatureUnit = 'celsius'
): string {
  if (unit === 'fahrenheit') {
    const mph = Math.round(speedKmh * 0.621371);
    return `${mph} mph`;
  }
  return `${Math.round(speedKmh)} km/h`;
}

export function getWindDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return directions[index];
}

export function formatDayName(dateString: string, isToday = false): string {
  if (isToday) return 'Today';
  try {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } catch {
    return dateString;
  }
}

export function formatDateLabel(dateString: string): string {
  try {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
}

/**
 * Generates actionable intelligence and recommendations based on current weather and today's forecast
 */
export function generateActivityRecommendations(
  current: CurrentWeather,
  daily?: DailyForecast
): ActivityRecommendation[] {
  const temp = current.temperature;
  const wind = current.windspeed;
  const code = current.weathercode;
  const isRain = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
  const isSnow = [71, 73, 75, 77, 85, 86].includes(code);
  const isStorm = [95, 96, 99].includes(code);
  const isClear = [0, 1].includes(code);

  const uvMax = daily?.uv_index_max?.[0] ?? (isClear && temp > 18 ? 6 : 3);
  const rainProb = daily?.precipitation_probability_max?.[0] ?? (isRain ? 85 : 15);

  const recommendations: ActivityRecommendation[] = [];

  // 1. Running & Outdoor Exercise
  let runStatus: ActivityRecommendation['status'] = 'good';
  let runScore = 8;
  let runSummary = 'Good running conditions';
  let runDetail = 'Comfortable ambient temperature for distance or interval running.';

  if (isStorm) {
    runStatus = 'poor';
    runScore = 1;
    runSummary = 'Stay indoors';
    runDetail = 'Thunderstorms and lightning pose safety risks. Exercise indoors today.';
  } else if (isRain || rainProb > 70) {
    runStatus = 'caution';
    runScore = 4;
    runSummary = 'Wet pavement & reduced traction';
    runDetail = 'Slip hazard present. Use water-resistant gear with bright reflective accents.';
  } else if (isSnow || temp < 0) {
    runStatus = 'caution';
    runScore = 4;
    runSummary = 'Freezing temperature';
    runDetail = 'Dress in thermal moisture-wicking layers and watch for icy paths.';
  } else if (temp > 28) {
    runStatus = 'caution';
    runScore = 5;
    runSummary = 'High heat caution';
    runDetail = 'Hydrate frequently. Best to run during early morning or evening hours.';
  } else if (temp >= 12 && temp <= 22 && wind < 25) {
    runStatus = 'optimal';
    runScore = 10;
    runSummary = 'Peak running window';
    runDetail = 'Ideal temperature range with pleasant air currents for peak athletic performance.';
  }

  recommendations.push({
    id: 'running',
    title: 'Running & Cardio',
    category: 'Fitness',
    status: runStatus,
    score: runScore,
    summary: runSummary,
    detail: runDetail,
    icon: 'Activity',
  });

  // 2. Commute & Daily Travel
  let commuteStatus: ActivityRecommendation['status'] = 'optimal';
  let commuteScore = 9;
  let commuteSummary = 'Clear transit routes';
  let commuteDetail = 'No weather-related travel disruptions anticipated.';

  if (isStorm || (isRain && wind > 35)) {
    commuteStatus = 'poor';
    commuteScore = 2;
    commuteSummary = 'Significant weather delays';
    commuteDetail = 'Heavy precipitation and strong winds may cause traffic delays and low visibility.';
  } else if (isRain || rainProb > 50) {
    commuteStatus = 'caution';
    commuteScore = 5;
    commuteSummary = 'Umbrella essential';
    commuteDetail = 'Pack a compact umbrella and water-resistant footwear before heading out.';
  } else if (isSnow) {
    commuteStatus = 'caution';
    commuteScore = 4;
    commuteSummary = 'Winter road conditions';
    commuteDetail = 'Allow extra travel time for slick roads, defrosting, and reduced braking.';
  }

  recommendations.push({
    id: 'commute',
    title: 'Daily Commute & Travel',
    category: 'Mobility',
    status: commuteStatus,
    score: commuteScore,
    summary: commuteSummary,
    detail: commuteDetail,
    icon: 'Navigation',
  });

  // 3. Outdoor Dining & Social Gatherings
  let diningStatus: ActivityRecommendation['status'] = 'good';
  let diningScore = 7;
  let diningSummary = 'Pleasant for open-air seating';
  let diningDetail = 'Comfortable for patio dining and outdoor cafes.';

  if (isRain || isStorm || isSnow) {
    diningStatus = 'poor';
    diningScore = 2;
    diningSummary = 'Indoor seating recommended';
    diningDetail = 'Precipitation will make open-air patios uncomfortable.';
  } else if (wind > 30) {
    diningStatus = 'caution';
    diningScore = 4;
    diningSummary = 'Breezy conditions';
    diningDetail = 'Gusty winds may disturb outdoor table settings.';
  } else if (temp < 13) {
    diningStatus = 'caution';
    diningScore = 5;
    diningSummary = 'Heated patio needed';
    diningDetail = 'Chilly air. Choose a venue with outdoor heaters or firepits.';
  } else if (temp >= 19 && temp <= 26 && wind < 20) {
    diningStatus = 'optimal';
    diningScore = 10;
    diningSummary = 'Perfect patio weather';
    diningDetail = 'Gentle breezes and pleasant warmth make this an ideal day for terrace dining.';
  }

  recommendations.push({
    id: 'dining',
    title: 'Outdoor Dining & Patios',
    category: 'Lifestyle',
    status: diningStatus,
    score: diningScore,
    summary: diningSummary,
    detail: diningDetail,
    icon: 'Coffee',
  });

  // 4. Wardrobe & Layering
  let wardrobeStatus: ActivityRecommendation['status'] = 'optimal';
  let wardrobeScore = 8;
  let wardrobeSummary = 'Light casual wear';
  let wardrobeDetail = 'Standard comfortable apparel with minimal extra layers needed.';

  if (temp < 5) {
    wardrobeStatus = 'caution';
    wardrobeScore = 6;
    wardrobeSummary = 'Heavy winter coat & gloves';
    wardrobeDetail = 'Insulated outer jacket, thermal undershirts, and gloves recommended.';
  } else if (temp < 15) {
    wardrobeStatus = 'good';
    wardrobeScore = 7;
    wardrobeSummary = 'Sweater or light jacket';
    wardrobeDetail = 'A fleece, denim jacket, or lightweight cardigan is ideal for morning and evening dips.';
  } else if (temp > 27) {
    wardrobeStatus = 'good';
    wardrobeScore = 8;
    wardrobeSummary = 'Breathable lightweight fabrics';
    wardrobeDetail = 'Wear loose cotton or linen garments and stay hydrated.';
  }

  recommendations.push({
    id: 'wardrobe',
    title: 'Wardrobe & Layering',
    category: 'Comfort',
    status: wardrobeStatus,
    score: wardrobeScore,
    summary: wardrobeSummary,
    detail: wardrobeDetail,
    icon: 'Shirt',
  });

  // 5. Sun & UV Safety
  let uvStatus: ActivityRecommendation['status'] = 'optimal';
  let uvScore = 9;
  let uvSummary = 'Low UV hazard';
  let uvDetail = 'Sunburn risk is minimal throughout the day.';

  if (uvMax >= 8) {
    uvStatus = 'caution';
    uvScore = 3;
    uvSummary = 'Very High UV index';
    uvDetail = 'Apply SPF 50+ sunscreen, wear UV-rated sunglasses, and seek shade between 11 AM - 4 PM.';
  } else if (uvMax >= 6) {
    uvStatus = 'good';
    uvScore = 6;
    uvSummary = 'Moderate to High UV';
    uvDetail = 'Apply SPF 30+ sunscreen if spending more than 30 minutes in direct sunlight.';
  }

  recommendations.push({
    id: 'uv',
    title: 'Sun Exposure & UV Protection',
    category: 'Health',
    status: uvStatus,
    score: uvScore,
    summary: uvSummary,
    detail: uvDetail,
    icon: 'Sun',
  });

  return recommendations;
}
