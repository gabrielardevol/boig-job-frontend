import { Component } from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions, ChartType, DefaultDataPoint} from 'chart.js';
import {NgChartsModule} from 'ng2-charts';
import {BackendApiService} from '../../core/backend.api';

@Component({
  selector: 'app-pie-chart',
  imports: [
    NgChartsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  skills: {skill: string, count: any}[] = [];

  constructor(backendApi: BackendApiService) {
    backendApi.dashboardGetSkills().subscribe(skills => {
      this.skills = Object.entries(skills[0]).map(([key, value]) => ({
        skill: key,
        count: value
      }
      )
      );

      let topSkillsLabels = this.skills.slice(0, 10).map(item => item.skill);
      let topSkillsCounts = this.skills.slice(0, 10).map(item => item.count);
      let totalValue = this.skills.map(item => item.count).reduce((sum, current) => sum + current, 0);
      let otherSkillsValue = totalValue - topSkillsCounts.reduce((sum, current) => sum + current, 0);

      this.pieChartData =
       {
        labels: [...topSkillsLabels, 'others'],
        datasets: [
          // {
          //   data: skills.map(item => item.skill);
          //   label: 'Series A'
          // },
          {
            data:  [...topSkillsCounts, otherSkillsValue],
            label: 'Offers'
          }
        ]
      };
    })
  }


  public pieChartLabels:string[] = [];
  public pieChartData:ChartData<ChartType, DefaultDataPoint<ChartType>, string> | undefined = {
    labels: [],
    datasets: [
      {
        data: [],
        label: ''
      }
    ]
  };
  public pieChartType: 'pie' = 'pie';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // <- Això permet adaptar-se a l'alçada del contenidor
  };


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
