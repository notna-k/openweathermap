import { OpenweathermapResponseTempInfo } from '../interfaces/openweathermap-api-response';

export class GetDataDto {
  sunrise?: number;
  sunset?: number;
  temp?: number | OpenweathermapResponseTempInfo;
  feels_like?: number | OpenweathermapResponseTempInfo;
  pressure?: number;
  humidity?: number;
  uvi?: number;
  wind_speed?: number;
}

export class GetDataResponseDto {
  data: GetDataDto[];
}
