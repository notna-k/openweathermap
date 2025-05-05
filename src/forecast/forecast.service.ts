import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RequestDataRequestDto } from './dto/request-data.request.dto';
import { Forecast } from './forecast.model';
import { ForecastApiService } from './forecast-api.service';
import { ForecastMapper } from './forecast.mapper';
import { GetDataRequestDto } from './dto/get-data.request.dto';

@Injectable()
export class ForecastService {
  constructor(
    @InjectModel(Forecast) private forecastRepository: typeof Forecast,
    private readonly forecastApi: ForecastApiService,
    private readonly forecastMapper: ForecastMapper,
  ) {}

  async requestData({ lon, part, lat }: RequestDataRequestDto): Promise<any> {
    const data = await this.forecastApi.get({ lon, part, lat });
    const mapped = this.forecastMapper.toModel(data, part);

    await this.forecastRepository.bulkCreate([mapped], {
      updateOnDuplicate: ['data'],
      conflictAttributes: ['lat', 'lon', 'part'],
    });
    return { success: true };
  }

  async getData({ lon, part, lat }: GetDataRequestDto): Promise<any> {
    const forecast = await this.forecastRepository.findOne({
      where: {
        lon,
        part,
        lat,
      },
    });

    if (!forecast) {
      throw new NotFoundException();
    }

    return forecast.data;
  }
}
