import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @Input() id: any;
  @Input() type: any;
  @Input() labels: any;
  @Input() options: any;
  @Input() data!: unknown[];
  @Input() dataOptions: any;

  chart: any;
  private datasets: object[] = [];

  ngOnInit(): void {
    this.data.forEach((value, index: number) => {
      this.datasets.push({
        data: value,
        ...this.dataOptions[index]
      });
    });
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.id, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
  }

}
