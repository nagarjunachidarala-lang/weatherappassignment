import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Snowflake,
  CloudLightning,
  CloudHail,
  Wind,
  Activity,
  Navigation,
  Coffee,
  Shirt,
  Compass,
  Droplets,
  Thermometer,
  ShieldAlert,
  Umbrella,
  Eye,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const props = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'SunMedium':
      return <SunMedium {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudRainWind':
      return <CloudRainWind {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'Snowflake':
      return <Snowflake {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'CloudHail':
      return <CloudHail {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Activity':
      return <Activity {...props} />;
    case 'Navigation':
      return <Navigation {...props} />;
    case 'Coffee':
      return <Coffee {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Thermometer':
      return <Thermometer {...props} />;
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Umbrella':
      return <Umbrella {...props} />;
    case 'Eye':
      return <Eye {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    default:
      return <CloudSun {...props} />;
  }
};
