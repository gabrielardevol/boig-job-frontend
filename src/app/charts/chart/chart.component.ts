import { Component } from '@angular/core';
import {NgChartsModule} from 'ng2-charts';
import {ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
import {BackendApiService} from '../../core/backend.api';

@Component({
  selector: 'app-chart',
  imports: [
    NgChartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }
  chartOptions: ChartConfiguration<"bar", Array<number | [number, number] | null>, any>["options"] = {
    responsive: true,
    maintainAspectRatio: false,
  }

  chartType: 'bar' = 'bar';

  offersByDay: {day: string | Date; count: number}[] = [];

  constructor(backendApi: BackendApiService) {
    backendApi.getOffersByDay().subscribe(offersByDay => {
      this.offersByDay = offersByDay[0];
      // console.log(this.offersByDay)
      let days = this.offersByDay.map(item => item.day.toString().slice(0, 10));
      let counts = this.offersByDay.map(item => item.count);

      this.chartData =  {
        labels: days,
        datasets: [
          {
            data: counts,
            label: 'Applications'
          },
        ]
      }
    })
  }

}
