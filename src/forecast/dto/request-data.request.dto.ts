import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import {
  AvailableForecastParts,
  ForecastParts,
} from '../../shared/constants/forecast-parts';

export class RequestDataRequestDto {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsEnum(AvailableForecastParts)
  part: ForecastParts;
}
