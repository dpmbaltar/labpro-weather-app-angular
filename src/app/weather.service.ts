import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeatherResponse, DailyWeatherResponse, HourlyWeatherResponse } from './weather';
import { ConfigService } from './config.service';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  private current!: Observable<CurrentWeatherResponse>;
  private currentTime: number = 0;
  private daily!: Observable<DailyWeatherResponse>;
  private dailyTime: number = 0;
  private hourly!: Observable<HourlyWeatherResponse>;
  private hourlyTime: number = 0;
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

  getCurrent(lat: number, lon: number) {
    const elapsedTime = (Date.now() / 1000) - this.currentTime;
    const cacheExpired = elapsedTime > this.config.weatherCacheTtl;

    if (cacheExpired || !this.current) {
      let url = this.config.apiBaseUrl
      url += `/api/weather/current?latitude=${lat}&longitude=${lon}`;
      this.current = this.http.get<CurrentWeatherResponse>(url)
        .pipe(shareReplay(1));
      this.currentTime = Date.now() / 1000;
    }

    return this.current;
  }

  getDaily(lat: number, lon: number) {
    const elapsedTime = (Date.now() / 1000) - this.dailyTime;
    const cacheExpired = elapsedTime > this.config.weatherCacheTtl;

    if (cacheExpired || !this.daily) {
      let url = this.config.apiBaseUrl;
      url += `/api/weather/daily?latitude=${lat}&longitude=${lon}`;
      this.daily = this.http.get<DailyWeatherResponse>(url)
        .pipe(shareReplay(1));
      this.dailyTime = Date.now() / 1000;
    }

    return this.daily;
  }

  getHourly(lat: number, lon: number, date: Date) {
    const elapsedTime = (Date.now() / 1000) - this.hourlyTime;
    const cacheExpired = elapsedTime > this.config.weatherCacheTtl;

    if (cacheExpired || !this.hourly) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      let url = this.config.apiBaseUrl;
      url += `/api/weather/hourly/${year}/${month}/${day}`
      url += `?latitude=${lat}&longitude=${lon}`;
      this.hourly = this.http.get<HourlyWeatherResponse>(url)
        .pipe(shareReplay(1));
      this.hourlyTime = Date.now() / 1000;
    }

    return this.hourly;
  }
}
