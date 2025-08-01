import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Offer, OfferResponse} from './domain.models';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private readonly BASE_URL = 'http://127.0.0.1:38363'
  private readonly API_URL = this.BASE_URL + '/api/';

  constructor(private http: HttpClient) {}

  createOffer(offer: Offer){
    return this.http.post<Offer>(this.API_URL + 'offers', offer, {
      headers: {
        'Content-Type': 'application/ld+json'
      }
    });
  }

  getAllOffers(page: number = 1 , attribute: string = 'appliedAt') {
    return this.http.get<{  member: Offer[];
      // http://127.0.0.1:44623/api/offers/?order[company]=asc
      [key: string]: any; }>(this.API_URL + 'offers/?order['+attribute+']=asc&page=' + page);
  }

  offersByCompanyLevenshtein(keywords: string){
    return this.http.get<{  member: Offer[];
      [key: string]: any; }>(this.API_URL + 'offersByCompanyLevenshtein/' + keywords);
  }

  dashboardGetSkills() {
    return this.http.get<{skill: string, count: number}[]>(this.API_URL + 'dashboard/skills');
  }

  getOffersByDay() {
    console.log("getting offers by day")
    return this.http.get<[{day: string | Date; count: number}[]]>(this.API_URL + 'dashboard/offersByDay');
  }

  createResponse(responseData: OfferResponse) {
    console.log("creating response from backend.api.ts" , responseData);
    return this.http.post<OfferResponse>(this.API_URL + 'offer_responses', responseData, {
      headers: {
        'Content-Type': 'application/ld+json'
      }
    });
  }

  updateOffer(iri: string, params: object) {
    return fetch(this.BASE_URL + iri, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/merge-patch+json' },
      body: JSON.stringify(params),
    })
      .then(res => res.json());
  }
  getAllEvents() {
    console.log("getting calendar events")
    return this.http.get<{ member: { name: string, date: string }[], [key: string]: any }>(this.API_URL + 'calendar_events');
  }

  newStatusChange(offer: string, status: number) {
    return this.http.post<OfferResponse>(
      this.API_URL + 'status_changes',
      {
        status: status,
        createdAt: new Date(),
        offer: 'api/offers/' + offer
      },
      {
        headers: {
          'Content-Type': 'application/ld+json'
        }
      }
    );
  }
}
