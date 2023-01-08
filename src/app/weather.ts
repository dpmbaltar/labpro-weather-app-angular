export interface Location {
  name: string
  region: string
  country: string
  latitude: number
  longitude: number
  elevation: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface CurrentWeather {
  time: string
  temperature: number
  feelslike: number
  humidity: number
  windspeed: number
  winddirection: number
  weathercode: number
  uv: number
  is_day: number
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relativehumidity_2m: string
  dewpoint_2m: string
  apparent_temperature: string
  precipitation: string
  weathercode: string
  surface_pressure: string
  cloudcover: string
  visibility: string
  windspeed_10m: string
  winddirection_10m: string
  windgusts_10m: string
  shortwave_radiation: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relativehumidity_2m: number[]
  dewpoint_2m: number[]
  apparent_temperature: number[]
  precipitation: number[]
  weathercode: number[]
  surface_pressure: number[]
  cloudcover: number[]
  visibility: number[]
  windspeed_10m: number[]
  winddirection_10m: number[]
  windgusts_10m: number[]
  shortwave_radiation: number[]
}

export interface DailyUnits {
  time: string
  weathercode: string
  temperature_2m_max: string
  temperature_2m_min: string
  apparent_temperature_max: string
  apparent_temperature_min: string
  sunrise: string
  sunset: string
  precipitation_sum: string
  precipitation_hours: string
  windspeed_10m_max: string
  windgusts_10m_max: string
  winddirection_10m_dominant: string
  shortwave_radiation_sum: string
}

export interface Daily {
  time: string
  weathercode: number
  temperature_2m_max: number
  temperature_2m_min: number
  apparent_temperature_max: number
  apparent_temperature_min: number
  sunrise: string
  sunset: string
  precipitation_sum: number
  precipitation_hours: number
  windspeed_10m_max: number
  windgusts_10m_max: number
  winddirection_10m_dominant: number
  shortwave_radiation_sum: number
}

export interface WeatherResult {
  location?: Location
  current_weather?: CurrentWeather
  hourly_units?: HourlyUnits
  hourly?: Hourly
  daily_units?: DailyUnits
  daily?: Daily
  error?: {
    code: number
    reason: string
  }
}

export interface WeatherCondition {
  code: number
  day: string
  night: string
  icon: number
}
