import {Component, ViewChild} from '@angular/core';
import {Offer, OfferResponse} from '../core/domain.models';
import {v4 as uuidv4} from 'uuid';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {LlmApiService} from '../core/llm.api';
import {BackendApiService} from '../core/backend.api';

@Component({
  selector: 'app-add-response',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './add-response.component.html',
  styleUrl: './add-response.component.scss'
})
export class AddResponseComponent {
  @ViewChild('jobForm') jobForm!: NgForm;
  offers: { id: string, company: string, role: string }[] | Offer[] = []
  selectedOffer: string | undefined = undefined;

  constructor(private llmApi: LlmApiService, private backendApi: BackendApiService) {
  }

  onSubmit(formValue: any) {
    const id = uuidv4()

    const offerData: OfferResponse = {
      offer: this.selectedOffer,
      text: formValue.text,
      type: formValue.type,
      company: formValue.company,
      id: id
    };

    this.backendApi.createResponse(offerData).subscribe(
      response => console.log(response)
    )


    //TECNICAL DEBT

    // 1- Waiting
    // 2- Rejected
    // 3- interviewPhase
    // 4- waitingForFeedback
    // 5- waitingForUser
    // 6- refusedByUser
    // 7- accepted
    let offerState: string = "";
    let offerStateIndex: number = 1;
    if (offerData.type === 'rejection') {
      offerState = "rejected";
      offerStateIndex = 2;
    }
    if (offerData.type === 'confirmation') {
      offerState = "inProcess";
      offerStateIndex = 1;

    }
    if (offerData.type === 'interview') {
      offerState = "inProcess";
      offerStateIndex = 3;
    }
    if (offerData.type === 'employmentOffer') {
      offerState = "inProcess";
      offerStateIndex = 5;
    }

    this.backendApi.updateOffer(this.selectedOffer!, {'state': offerState}).then(
      this.backendApi.newStatusChange(offerData.id, offerStateIndex).subscribe
    )
  }

  onPromptTextChange(text: string) {
    // fer la crida de la api
    this.llmApi.sendReply(text).subscribe(
      response => {
        this.jobForm.form.patchValue(response.output)
        console.log("this.jobForm.value.company", this.jobForm.value.company)
        this.backendApi.offersByCompanyLevenshtein(this.jobForm.value.company).subscribe(
          response => {
            this.offers = response['offers'];
            console.log(response)
          }
        )
      }
    )
  }
}
