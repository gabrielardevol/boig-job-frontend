import {Component, Input} from '@angular/core';
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
  @Input() offers: any;
  @Input() responses: any;
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

  ngOnChanges() {
    if (!this.offers || this.offers.length === 0) return;
    const parsedOffers = this.offers.map((item: { day: string; count: number }) => ({
      date: new Date(item.day),
      value: item.count
    }));
    const parsedResponses = this.responses.map((item: { day: string; count: number }) => ({
      date: new Date(item.day),
      value: item.count
    }));
    const dates = parsedOffers.map((d: { date: Date; value: number }) => d.date);
    const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
    const maxDate = new Date();
    const offersDateMap = new Map<string, number>();
    parsedOffers.forEach((item: { date: Date; value: number }) => {
      const key = item.date.toISOString().split('T')[0];
      offersDateMap.set(key, item.value);
    });
    const responsesDateMap = new Map<string, number>();
    parsedResponses.forEach((item: { date: Date; value: number }) => {
      const key = item.date.toISOString().split('T')[0];
      responsesDateMap.set(key, item.value);
    });
    const allOfferDates: string[] = [];
    // const allResponseDates: string[] = [];

    const allOfferValues: number[] = [];
    const allResponseValues: number[] = [];

    const currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
      const key = currentDate.toISOString().split('T')[0];
      allOfferDates.push(key);
      // allResponseDates.push(key);
      allOfferValues.push(offersDateMap.get(key) ?? 0);
      allResponseValues.push(responsesDateMap.get(key) ?? 0);

      currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(allDates, allValues)
    // this.chartData.labels = allDates;
    // this.chartData.datasets = [{data: allValues, label: 'Applications'}];
    // console.log(this.chartData);
    //

      this.chartData =  {
        labels: allOfferDates,
        datasets: [
          {
            data: allOfferValues,
            label: 'Applications',
            backgroundColor: '#494949',
            borderColor: '#434343',
            borderRadius: 0
          },
          {
            data: allResponseValues,
            label: 'Positive responses',
            backgroundColor: '#65afa4',
            borderColor: '#434343',
            borderRadius: 0
          },
        ]
      }
    // this.lineChartLabels = allDates;
  }

}
