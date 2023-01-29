export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezoneAbbreviation: string;
  utcOffsetSeconds: number;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  uv: number;
  isDay: boolean;
  weatherCode: number;
}

export interface DailyWeather {
  time: string;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  sunrise: string;
  sunset: string;
  precipitationSum: number;
  precipitationHours: number;
  windSpeedMax: number;
  windGustsMax: number;
  windDirection: number;
  weatherCode: number;
}

export interface HourlyWeather {
  time: string[];
  temperature: number[];
  apparentTemperature: number[];
  precipitation: number[];
  relativeHumidity: number[];
  dewPoint: number[];
  cloudCover: number[];
  visibility: number[];
  surfacePressure: number[];
  windSpeed: number[];
  windDirection: number[];
  windGusts: number[];
  weatherCode: number[];
}

export interface Weather {
  location?: WeatherLocation;
  current?: CurrentWeather;
  daily?: DailyWeather[];
  hourly?: HourlyWeather[];
  error?: any;
}

export interface CurrentWeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  error?: any;
}

export interface DailyWeatherResponse {
  location: WeatherLocation;
  daily: DailyWeather[];
  error?: any;
}

export interface HourlyWeatherResponse {
  location: WeatherLocation;
  hourly: HourlyWeather[];
  error?: any;
}

export interface WeatherCondition {
  code: number;
  day: string;
  night: string;
  icon: number;
}
