import {Component, ElementRef, ViewChild, ViewRef} from '@angular/core';
import {BackendApiService} from '../core/backend.api';
import {Offer} from '../core/domain.models';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.scss'
})
export class ApplicationListComponent {

  @ViewChild('sortSelector') sortSelector!: ElementRef<HTMLInputElement>;

  offers: Offer[] = []
  offersByDay: {day: string, count: number}[] = []
  page: number = 1;
  backendApi: BackendApiService;
  totalOffers: number = 0;
  itemsPerPage: number = 30;

  loading: boolean = false;

  viewType: 'table' | 'mozaik' = 'mozaik'

  constructor(backendApi: BackendApiService) {
    this.backendApi = backendApi;
    this.callApi(this.page, 'appliedAt')
  }

  callApi(page: number = this.page, attribute: string = this.sortSelector.nativeElement.value) {
    this.backendApi.getAllOffers(page, attribute).subscribe(offers => {
      console.log(offers, typeof(this.offers) );
      this.totalOffers = offers['totalItems']
      this.offers = offers['member']
      this.offersByDay = this.groupDatesByDay(this.offers.map(offer => offer.appliedAt))
      this.loading = false;
    })

  }
  groupDatesByDay(dates: any[]): { day: string; count: number }[] {
    const counter: Record<string, number> = {};

    for (const raw of dates) {
      const date = raw instanceof Date ? raw : new Date(raw);
      if (isNaN(date.getTime())) continue; // descarta valors invàlids

      const dayStr = date.toISOString().split('T')[0];
      counter[dayStr] = (counter[dayStr] || 0) + 1;
    }

    return Object.entries(counter).map(([day, count]) => ({ day, count }));
  }

  sortOffers() {
    this.page = 1;
    let selectedValue = this.sortSelector.nativeElement.value;
    this.callApi(this.page, selectedValue)
  }
}
