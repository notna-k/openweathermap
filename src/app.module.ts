import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { ForecastModule } from './forecast/forecast.module';
import { Forecast } from './forecast/forecast.model';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      models: [Forecast],
      autoLoadModels: true,
      logging: false,
    }),

    ForecastModule,
  ],
})
export class AppModule {}
