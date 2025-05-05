import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { OpenweathermapApiResponse } from './interfaces/openweathermap-api-response';
import { ConfigService } from '@nestjs/config';
import { ForecastParts } from '../shared/constants/forecast-parts';

@Injectable()
export class ForecastApiService {
  private readonly request: AxiosInstance;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get('OPENWEATHERMAP_API_KEY');
    if (!apiKey) throw new Error('OPENWEATHERMAP_API_KEY must be specified!');

    this.request = axios.create({
      baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
      params: {
        appid: apiKey,
      },
    });
  }

  _getExcludeParam(part: ForecastParts) {
    return Object.values(ForecastParts)
      .filter((p) => p !== part)
      .join(',');
  }

  async get({
    lon,
    part,
    lat,
  }: {
    lon: number;
    part: ForecastParts;
    lat: number;
  }): Promise<OpenweathermapApiResponse> {
    const { data } = await this.request.get('', {
      params: {
        lon,
        exclude: this._getExcludeParam(part),
        lat,
      },
    });
    return data;
  }
}
