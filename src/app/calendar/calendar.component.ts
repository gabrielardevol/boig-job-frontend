import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {BackendApiService} from '../core/backend.api';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  currentMonth: number;
  currentDay: number;
  currentYear: number;
  daysInMonth: number[] = []

  calendarEvents: { name: string, date: Date, [key: string]: any }[] = []

  constructor(backendApi: BackendApiService) {
    backendApi.getAllEvents().subscribe(calendarEvents => {
      const parsed = calendarEvents['member'].map(e => ({
        ...e,
        date: new Date(e.date)
      }));
     console.log(parsed);
     this.calendarEvents = parsed;
     console.log(this.calendarEvents)
    })

    const today = new Date();
    this.currentMonth = today.getMonth() + 1; // Els mesos comencen en 0 (0 = gener)
    this.currentDay = today.getDate();
    this.currentYear = today.getFullYear();
    this.generateCalendar(this.currentYear, this.currentMonth - 1);
    console.log(this.calendarEvents)
  }

  generateCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month, 1).getDay(); // Dia de la setmana del dia 1
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de dies del mes
    const blanks = Array(firstDay).fill(null); // Dies buits al principi
    this.daysInMonth = [...blanks, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  }

  changeMonth(interval: number) :void {
    this.currentMonth += interval;
    if (this.currentMonth == 0 ){this.currentMonth = 12;  this.currentYear -= 1}
    else if (this.currentMonth == 13){this.currentMonth = 1; this.currentYear += 1}
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

}
