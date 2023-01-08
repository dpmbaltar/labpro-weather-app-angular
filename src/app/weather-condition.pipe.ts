import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WeatherCondition } from './weather';
import { WeatherService } from './weather.service';

@Pipe({
  name: 'weatherCondition'
})
export class WeatherConditionPipe implements PipeTransform {

  constructor(private weatherService: WeatherService) {}

  transform(weatherCode: number, item: string = "code"): any {
    return this.weatherService.getConditions().pipe(map((conditions) => {
      const condition = conditions.find((o: any) => {
        return Number(o.code) === Number(weatherCode);
      });

      let result;
      switch (item) {
        case "day":
          result = condition?.day;
          break;
        case "night":
          result = condition?.night;
          break;
        case "icon":
          result = condition?.icon;
          break;
        case "code":
        default:
          result = condition?.code;
      }

      return result;
    }));
  }
}
