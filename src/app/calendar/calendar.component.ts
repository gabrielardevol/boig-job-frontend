import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BackendApiService} from '../core/backend.api';
import {FillersContainerComponent} from 'confettti';
import {OfferViewComponent} from '../application-list/offer-view/offer-view.component';
import {InterviewViewComponent} from './interview-view/interview-view.component';
import {Assignment, Interview} from '../core/domain.models';
import {AssignmentViewComponent} from './assignment-view/assignment-view.component';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FillersContainerComponent,
    OfferViewComponent,
    InterviewViewComponent,
    AssignmentViewComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  displayedMonth: number;
  currentDay: number;
  currentYear: number;
  daysInMonth: number[] = [];
  currentMonth = new Date().getMonth();
  months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

  interviews: Interview[] = []
  assignments: Assignment[] = []

  toDo: any;
  selectedInterview: Interview | undefined;
  selectedAssignment: Assignment | undefined;

  constructor(backendApi: BackendApiService) {
    const today = new Date();
    this.displayedMonth = today.getMonth(); // Els mesos comencen en 0 (0 = gener)
    this.currentDay = today.getDate();
    this.currentYear = today.getFullYear();

    backendApi.getAllInterviews().subscribe(response => {
      const parsed = response['member'].map(e => ({
        ...e,
        date: new Date(e.date)
      }));
      this.interviews = parsed;
    })

    backendApi.getAllAssignments().subscribe(response => {
      const parsed = response['member'].map(e => ({
        ...e,
        date: new Date(e.date)
      }));
      this.assignments = parsed;
    })

    this.generateCalendar(this.currentYear, this.displayedMonth);

  }


  generateCalendar(year: number, month: number): void {
    let firstDay = new Date(year, month, 1).getDay(); // Dia de la setmana del dia 1
    firstDay = (firstDay === 0) ? 6 : firstDay - 1; // ara 0 = dl, 6 = dg
    const daysInMonth = new Date(year, month, 0).getDate(); // Total de dies del mes
    const blanks = Array(firstDay).fill(null); // Dies buits al principi
    this.daysInMonth = [...blanks, ...Array.from({length: daysInMonth}, (_, i) => i + 1)];
  }

  changeMonth(interval: number): void {
    this.displayedMonth += interval;
    if (this.displayedMonth == 0) {
      this.displayedMonth = 12;
      this.currentYear -= 1
    } else if (this.displayedMonth == 13) {
      this.displayedMonth = 1;
      this.currentYear += 1
    }
    this.generateCalendar(this.currentYear, this.displayedMonth);
  }

}
