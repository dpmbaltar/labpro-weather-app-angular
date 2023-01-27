import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HourlyWeatherResponse, WeatherLocation } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnInit {

  @Input() id!: string;
  @Input() date!: string;
  @Input() location!: WeatherLocation;

  hourlyWeather!: Observable<HourlyWeatherResponse>;
  hourlyLabels!: string[];

  chart = {
    temperature: {
      dataOptions: {
        label: 'Temperatura (°C)',
        fill: true,
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 1,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 10
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false }
      }
    },
    apparentTemperature: {
      dataOptions: {
        label: 'Sensación térmica (°C)',
        fill: true,
        backgroundColor: 'rgba(255, 58, 0, 0.2)',
        borderColor: 'rgb(255, 58, 0)',
        borderWidth: 1,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 10
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false }
      }
    },
    precipitation: {
      dataOptions: {
        label: 'Precipitaciones (%)',
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: { top: 1 },
        minBarLength: 1
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: { y: { suggestedMin: 0, suggestedMax: 1 } },
      }
    },
    relativeHumidity: {
      dataOptions: {
        label: 'Humedad relativa (%)',
        fill: false,
        backgroundColor: 'rgba(37, 150, 190, 0.2)',
        borderColor: 'rgb(37, 150, 190)',
        borderWidth: { top: 1 },
        minBarLength: 1
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: { y: { suggestedMin: 0, suggestedMax: 1 } },
      }
    }
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const { latitude, longitude, utcOffsetSeconds } = this.location;
    const time = Date.parse(this.date) + Math.abs(utcOffsetSeconds * 1000);
    const date = new Date(time);
    this.hourlyWeather = this.weatherService.getHourly(latitude, longitude, date);
    this.hourlyWeather.subscribe(response => {
      if (response.hourly.length > 0)
        this.hourlyLabels = response.hourly[0].time.map(v => {
          const time = v.split('T')[1];
          return time;
        });
    });
  }

}
