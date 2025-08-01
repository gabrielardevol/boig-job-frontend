import { Component } from '@angular/core';
import {BackendApiService} from '../core/backend.api';
import {JsonPipe, NgForOf} from '@angular/common';
import {ChartComponent} from "../charts/chart/chart.component";
import {LineChartDemoComponent} from "../charts/line-chart/line-chart.component";
import {PieChartComponent} from "../charts/pie-chart/pie-chart.component";

@Component({
  selector: 'app-dashboard',
    imports: [
        NgForOf,
        ChartComponent,
        LineChartDemoComponent,
        PieChartComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  skills: {skill: string, count: any}[] = [];
  offersByDay: {day: string | Date; count: number}[] = [];

  constructor(backendApi: BackendApiService) {
    backendApi.dashboardGetSkills().subscribe(skills => {
      // this.offers = offers;
      this.skills = Object.entries(skills[0]).map(([key, value]) => ({
        skill: key,
        count: value
      }));
    })

    backendApi.getOffersByDay().subscribe(offersByDay => {
      this.offersByDay = offersByDay[0];
      console.log(this.offersByDay)
    })
  }

  protected readonly Object = Object;


}
