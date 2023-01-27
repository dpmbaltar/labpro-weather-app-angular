import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeatherResponse } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  loaded: boolean = false;
  currentWeather!: Observable<CurrentWeatherResponse>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.currentWeather = this.weatherService.getCurrent(latitude, longitude);
        this.currentWeather.subscribe(res => this.loaded = true);
      });
  }

}
