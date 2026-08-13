# Weather Intelligence Dashboard

A responsive weather intelligence web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**, powered by **Open-Meteo Public Meteorological APIs**.

---

## Features

- **City Geocoding & Instant Search**: Fast, debounced search connected to the Open-Meteo Geocoding API with administrative regions, country details, and coordinates.
- **GPS Location Detection**: One-click "Use My Location" browser geolocation support.
- **Current Weather Dashboard**: Real-time temperature, condition badge with WMO code translation, apparent temperature ("Feels Like"), wind speed & 8-point compass direction, relative humidity, precipitation probability, and UV index.
- **Unit Toggling**: Instant switching between Celsius (°C) and Fahrenheit (°F) with automatic unit conversion across all metrics and charts.
- **7-Day Forecast Cards**: Daily outlook cards showcasing high/low temperature metrics and relative temperature range indicator bars.
- **Interactive Weather Trend Charts**: Responsive area charts powered by Recharts with dual-gradient curves for 7-day high/low trajectories and a 24-hour hourly trend view.
- **Activity & Lifestyle Intelligence**: Rule-based recommendations for outdoor workouts, commute preparedness, outdoor dining, wardrobe layering, and UV protection.
- **Graceful Error Handling**: Resilient handling of empty inputs, invalid city names, geolocation permission denials, and network timeouts.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **APIs**: [Open-Meteo API](https://open-meteo.com/) (No API key required)

---

## Getting Started

### Prerequisites

- **Node.js** (v18.x or later recommended)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and builds production-ready static assets in `dist/` |
| `npm run preview` | Locally previews the production build from `dist/` |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## Project Structure

```text
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
└── src/
    ├── main.tsx                 # React application root entry
    ├── App.tsx                  # Main dashboard layout & state management
    ├── index.css                # Global styles & Tailwind imports
    ├── types.ts                 # TypeScript interfaces and meteorological types
    ├── components/
    │   ├── Header.tsx           # Navigation bar with unit toggle & refresh button
    │   ├── SearchBar.tsx        # Geocoding search input, GPS locator & quick pills
    │   ├── CurrentWeatherCard.tsx # Hero current weather & key observation metrics
    │   ├── SevenDayForecast.tsx # 7-day daily forecast cards & range bars
    │   ├── WeatherTrendChart.tsx # Recharts area visualization (Daily & 24h Hourly)
    │   ├── ActivityIntelligence.tsx # Lifestyle & daily activity recommendations
    │   └── WeatherIcon.tsx      # Dynamic Lucide icon mapper
    ├── services/
    │   └── weatherService.ts    # Open-Meteo Geocoding & Forecast API client
    └── utils/
        └── weatherUtils.ts      # WMO condition maps, conversions & activity logic
```

---

## External APIs Used

1. **Geocoding API**:
   `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
2. **Forecast API**:
   `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,windspeed_10m_max,uv_index_max&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&timezone=auto`

---

## License

This project is licensed under the Apache-2.0 License.
