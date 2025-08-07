import {Component, Input} from '@angular/core';
import {Offer} from '../../core/domain.models';
import {CommentInputComponent} from '../../shared/comment-input/comment-input.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-offer-view',
  imports: [
    CommentInputComponent,
    NgForOf
  ],
  templateUrl: './offer-view.component.html',
  styleUrl: './offer-view.component.scss'
})
export class OfferViewComponent {
  @Input() offer!: Offer;

  ngOnChanges() {
    console.log(this.offer)
  }
}
