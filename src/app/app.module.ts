import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ConfigService } from './config.service';
import { WeatherConditionPipe } from './weather-condition.pipe';
import { UvIndicatorPipe } from './uv-indicator.pipe';

export function setupConfigServiceFactory(
  service: ConfigService
): Function {
  return () => service.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    ForecastComponent,
    WeatherConditionPipe,
    UvIndicatorPipe
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
