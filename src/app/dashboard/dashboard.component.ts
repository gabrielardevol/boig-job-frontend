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

  GAP: string = '1px';
  ROUNDED: string = '8px';
  skills: {skill: string, count: any}[] = [];
  offersByDay: {day: Date; count: number}[] = [];
  responsesByDay: {day: Date; count: number}[] = []
  kpiData: { [p: string]: any } = {};

  constructor(backendApi: BackendApiService) {
    backendApi.getDashboard().subscribe(
      dashboardData => {
        console.log(dashboardData)
        this.skills = Object.entries(dashboardData.skillFrequency).map(([key, value]) => ({
          skill: key,
          count: value
        }));
        this.offersByDay = dashboardData.offersByDay;
        this.responsesByDay = dashboardData.responsesByDay;
        this.kpiData = dashboardData.kpiData;
      }
    )
  }

  protected readonly Object = Object;


}
