import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes = [
  { path: 'current', component: CurrentComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: '', redirectTo: '/current', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
