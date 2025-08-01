import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AddApplicationComponent} from './add-application/add-application.component';
import {AddResponseComponent} from './add-response/add-response.component';
import {ApplicationListComponent} from './application-list/application-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CalendarComponent} from './calendar/calendar.component';

export const routes: Routes = [

  {path: 'addApplication', component: AddApplicationComponent},
  {path: 'addResponse', component: AddResponseComponent},
  {path: 'applicationList', component: ApplicationListComponent},
  {path: '', component: DashboardComponent},
  {path: 'calendar', component: CalendarComponent}

];
