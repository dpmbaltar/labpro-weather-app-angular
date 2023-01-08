import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvIndicator'
})
export class UvIndicatorPipe implements PipeTransform {

  transform(uv: number, ...args: unknown[]): string {
    let uvIndex = uv < 0 ? 0 : Math.round(uv);
    let uvText = "";

    switch (uvIndex) {
      case 0:
      case 1:
      case 2:
        uvText = "Índice UV bajo";
        break;
      case 3:
      case 4:
      case 5:
        uvText = "Índice UV moderado. Requiere protección.";
        break;
      case 6:
      case 7:
        uvText = "Índice UV alto. Requiere protección.";
        break;
      case 8:
      case 9:
      case 10:
        uvText = "Índice UV muy alto. Requiere protección extra.";
        break;
      case 11:
      default:
        uvText = "Índice UV extremadamente alto. Requiere protección extra.";
    }

    return uvText;
  }

}
