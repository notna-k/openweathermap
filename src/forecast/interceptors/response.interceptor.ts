import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetDataResponseDto } from '../dto/get-data.response.dto';

@Injectable()
export class ForecastResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data): GetDataResponseDto => {
        const infos = Array.isArray(data) ? data : [data];

        return {
          data: infos.map((info) => ({
            sunrise: info.sunrise,
            sunset: info.sunset,
            temp: info.temp,
            feels_like: info.feels_like,
            pressure: info.pressure,
            humidity: info.humidity,
            uvi: info.uvi,
            wind_speed: info.wind_speed,
          })),
        };
      }),
    );
  }
}
