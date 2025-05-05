import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';
import { ForecastApiService } from './forecast-api.service';
import { ForecastMapper } from './forecast.mapper';
import { Forecast } from './forecast.model';

@Module({
  controllers: [ForecastController],
  providers: [ForecastService, ForecastApiService, ForecastMapper],
  exports: [],
  imports: [
    SequelizeModule.forFeature([Forecast]),
    ConfigModule,
    ConfigModule.forRoot(),
  ],
})
export class ForecastModule {}
