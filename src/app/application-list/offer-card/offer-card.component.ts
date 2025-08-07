import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Offer} from '../../core/domain.models';
import {BackendApiService} from '../../core/backend.api';

@Component({
  selector: 'app-offer-card',
    imports: [
        NgForOf
    ],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss'
})
export class OfferCardComponent {
  @Input() offer: Offer | undefined = undefined;
  statusList: string[] = [
    'waiting', 'rejected', 'interview phase', 'waiting for feedback', 'waiting for user','refused by user', 'accepted'
  ]


}
