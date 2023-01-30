import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditionIcon'
})
export class ConditionIconPipe implements PipeTransform {

  transform(iconCode: number, isDay: boolean = true): string {
    return `assets/images/64x64/${isDay ? 'day' : 'night'}/${iconCode}.png`;
  }
}
