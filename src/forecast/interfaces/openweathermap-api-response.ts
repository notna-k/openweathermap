export interface OpenweathermapResponseTempInfo {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

export interface OpenweathermapResponseWeatherInfo {
  id?: number;
  main?: string;
  description?: string;
  icon?: string;
}

export interface OpenweathermapDefaultInfo {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  summary?: string;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: OpenweathermapResponseWeatherInfo[];
  clouds?: number;
  pop?: number;
  rain?: number;
  uvi?: number;
  visibility: number;
}

export interface OpenweathermapForecastInfo extends OpenweathermapDefaultInfo {
  temp?: OpenweathermapResponseTempInfo;
  feels_like?: OpenweathermapResponseTempInfo;
}

export interface OpenweathermapCurrentInfo extends OpenweathermapDefaultInfo {
  temp: number;
  feels_like: number;
}

export interface OpenweathermapAlertInfo {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OpenweathermapMinutelyInfo {
  dt: number;
  precipitation: number;
}

export class OpenweathermapApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: OpenweathermapCurrentInfo;
  minutely?: OpenweathermapMinutelyInfo[];
  hourly?: OpenweathermapForecastInfo[];
  daily?: OpenweathermapForecastInfo[];
  alerts?: OpenweathermapAlertInfo[];
}
