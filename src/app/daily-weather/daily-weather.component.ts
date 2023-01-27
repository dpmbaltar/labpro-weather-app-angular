import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyWeatherResponse } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {

  loaded: boolean = false;
  dailyWeather!: Observable<DailyWeatherResponse>;
  time!: Date;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.time = new Date();
    this.weatherService.getPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.dailyWeather = this.weatherService.getDaily(latitude, longitude);
        this.dailyWeather.subscribe(res => this.loaded = true);
      });
  }

}
