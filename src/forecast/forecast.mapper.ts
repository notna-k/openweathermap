import { Injectable } from '@nestjs/common';
import { ForecastCreationAttributes } from './forecast.model';
import { OpenweathermapApiResponse } from './interfaces/openweathermap-api-response';
import { ForecastParts } from '../shared/constants/forecast-parts';
import { GetDataResponseDto } from './dto/get-data.response.dto';

@Injectable()
export class ForecastMapper {
  constructor() {}

  toModel(
    data: OpenweathermapApiResponse,
    part: ForecastParts,
  ): ForecastCreationAttributes {
    return {
      lat: data.lat,
      lon: data.lon,
      part,
      data: data[part],
    };
  }

  toDataResponse(data: any | any[]): GetDataResponseDto {
    const infos = Array.isArray(data) ? data : [data];

    const res = infos.map((info) => {
      return {
        sunrise: info.sunrise,
        sunset: info.sunset,
        temp: info.temp,
        feels_like: info.feels_like,
        pressure: info.pressure,
        humidity: info.humidity,
        uvi: info.uvi,
        wind_speed: info.wind_speed,
      };
    });

    return {
      data: res,
    };
  }
}
