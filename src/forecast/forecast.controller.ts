import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RequestDataRequestDto } from './dto/request-data.request.dto';
import { GetDataRequestDto } from './dto/get-data.request.dto';
import { ForecastService } from './forecast.service';
import { ForecastResponseInterceptor } from './interceptors/response.interceptor';
import { RequestDataResponseDto } from './dto/request-data.response.dto';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Post('/request')
  async requestData(
    @Body() body: RequestDataRequestDto,
  ): Promise<RequestDataResponseDto> {
    return await this.forecastService.requestData(body);
  }

  @Get('/')
  @UseInterceptors(ForecastResponseInterceptor)
  async getData(@Query() query: GetDataRequestDto): Promise<any> {
    return await this.forecastService.getData(query);
  }
}
