import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';

const routes: Routes = [
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'daily', component: DailyWeatherComponent },
  { path: '', redirectTo: '/current', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
