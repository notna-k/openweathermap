import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { ForecastParts } from '../../shared/constants/forecast-parts';

export class GetDataRequestDto {
  @IsNotEmpty()
  @IsNumberString()
  lat: number;

  @IsNotEmpty()
  @IsNumberString()
  lon: number;

  @IsNotEmpty()
  @IsEnum(ForecastParts, { message: 'part must be a valid ForecastPart' })
  part: ForecastParts;
}
