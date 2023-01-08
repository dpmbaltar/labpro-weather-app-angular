import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherCondition, WeatherResult } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  loaded: boolean = false;
  current!: Observable<WeatherResult>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        this.current = this.weatherService.getCurrent(latitude, longitude);
        this.current.subscribe(res => this.loaded = true);
      });
  }
}
