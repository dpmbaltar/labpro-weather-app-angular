import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherCondition, WeatherResult } from './weather';
import { ConfigService } from './config.service';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  private conditions!: Observable<WeatherCondition[]>;
  private current!: Observable<WeatherResult>;
  private currentTime: number = 0;
  private position: any = null;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  ngOnInit() {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.position) {
        resolve(this.position);
        return;
      }

      navigator.geolocation.getCurrentPosition(position => {
          this.position = position;
          resolve(this.position);
      },
      error => {
        reject(error);
      });
    });
  }

  getConditions() {
    if (!this.conditions) {
      const url = this.config.apiBaseUrl + "/api/weather/conditions";
      this.conditions = this.http.get<WeatherCondition[]>(url)
        .pipe(shareReplay(1));
    }

    return this.conditions;
  }

  getCurrent(lat: number, lon: number) {
    const elapsedTime = (Date.now() / 1000) - this.currentTime;
    const cacheExpired = elapsedTime > this.config.weatherCacheTtl;

    if (cacheExpired || !this.current) {
      const url = this.config.apiBaseUrl + `/api/weather/current?lat=${lat}&lon=${lon}`;
      this.current = this.http.get<WeatherResult>(url).pipe(shareReplay(1));
      this.currentTime = Date.now() / 1000;
    }

    return this.current;
  }
}
