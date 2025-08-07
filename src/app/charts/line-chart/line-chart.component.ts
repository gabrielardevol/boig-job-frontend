import {Component, Input} from '@angular/core';
import {NgChartsModule} from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  imports: [
    NgChartsModule
  ],
  templateUrl: './line-chart.component.html'
})
export class LineChartDemoComponent {
  @Input() data: any;
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;

  ngOnChanges() {
    if (!this.data || this.data.length === 0) return;
    const parsedData = this.data.map((item: { day: string; count: number }) => ({
      date: new Date(item.day),
      value: item.count
    }));
    const dates = parsedData.map((d: { date: Date; value: number }) => d.date);
    const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));
    const dateMap = new Map<string, number>();
    parsedData.forEach((item: { date: Date; value: number }) => {
      const key = item.date.toISOString().split('T')[0];
      dateMap.set(key, item.value);
    });
    const allDates: string[] = [];
    const allValues: number[] = [];
    const currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
      const key = currentDate.toISOString().split('T')[0];
      allDates.push(key);
      allValues.push(dateMap.get(key) ?? 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.lineChartData = [{
      data: allValues, label: 'applications'
    }]
    this.lineChartLabels = allDates;
  }


  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
