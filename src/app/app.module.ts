import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { WeatherConditionPipe } from './weather-condition.pipe';
import { UvIndicatorPipe } from './uv-indicator.pipe';
import { ChartComponent } from './chart/chart.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { HourlyWeatherComponent } from './hourly-weather/hourly-weather.component';

export function setupConfigServiceFactory(
  service: ConfigService
): Function {
  return () => service.load();
}

@NgModule({
  declarations: [
    AppComponent,
    WeatherConditionPipe,
    UvIndicatorPipe,
    ChartComponent,
    CurrentWeatherComponent,
    DailyWeatherComponent,
    HourlyWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupConfigServiceFactory,
      deps: [ ConfigService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
