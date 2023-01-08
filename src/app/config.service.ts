import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  options: Config = {};

  constructor(private http: HttpClient) {}

  get apiBaseUrl(): string {
    return this.options.apiBaseUrl || "";
  }

  get weatherCacheTtl(): number {
    return this.options.weatherCacheTtl || -1;
  }

  load(defaults?: Config): Promise<Config> {
    return new Promise<Config>(resolve => {
      this.http.get('assets/config.json').subscribe(
        response => {
          console.log('using server-side configuration');
          this.options = Object.assign({}, defaults || {}, response || {});
          resolve(this.options);
        },
        () => {
          console.log('using default configuration');
          this.options = Object.assign({}, defaults || {});
          resolve(this.options);
        }
      );
    });
  }
}
