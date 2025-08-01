import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ConfettiLayout, ModalComponent} from 'confettti';
import {AddApplicationComponent} from './add-application/add-application.component';
import {AddResponseComponent} from './add-response/add-response.component';
// import {ConfettiLayout} from 'confettti/src/lib/layout.component';
// import {ModalComponent} from 'confettti/src/lib/modal.component';
import { NgChartsModule } from 'ng2-charts';
import {ChartComponent} from './charts/chart/chart.component';
import {PieChartComponent} from './charts/pie-chart/pie-chart.component';
import {LineChartDemoComponent} from './charts/line-chart/line-chart.component';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfettiLayout, RouterLink, ConfettiLayout, NgChartsModule, ChartComponent, PieChartComponent, LineChartDemoComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'job-hunter';


  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  sidebar: boolean = false;

  openModal() {
    const modalRef = this.modalContainer.createComponent(ModalComponent);

    modalRef.instance.close.subscribe(() => {
      modalRef.destroy();
    });
  }
}
