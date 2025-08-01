import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Offer} from '../core/domain.models';
import { v4 as uuidv4 } from 'uuid';
import {LlmApiService} from '../core/llm.api';
import {BackendApiService} from '../core/backend.api';

@Component({
  selector: 'app-add-application',
  imports: [
    FormsModule
  ],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.scss'
})
export class AddApplicationComponent {

  @ViewChild('jobForm') jobForm!: NgForm;

  constructor(private llmApi: LlmApiService, private backendApi: BackendApiService) {
  }

  onSubmit(formValue: any) {
    const offerData: Offer  = {
      id: uuidv4(),
      text: formValue.text,
      company: formValue.company,
      role: formValue.role,
      experience: {
        minimum: formValue.experienceMinimum,
        maximum: formValue.experienceMaximum
      },
      skills: formValue.skills,
      salaryRange: {
        minimum: formValue.salaryMinimum,
        maximum: formValue.salaryMaximum
      },
      contractType: formValue.contractType,
      recruiter: formValue.recruiter,
      platform: formValue.platform,
      location: formValue.location,
      typology: formValue.typology,
      appliedAt: new Date(),
      responses: []
    };
    this.backendApi.createOffer(offerData).subscribe(
      response => {console.log(response);
      this.backendApi.newStatusChange(response.id, 1).subscribe()}
    )

    this.jobForm.reset()
  }

  onPromptTextChange(text: string) {
    console.log("onPromptTextChange()");

    if (text == "") {
      console.log("text == ''")
      return
    };

    this.llmApi.sendOffer(text).subscribe(
      response => {
        // console.log('response', response)
        this.jobForm.form.patchValue(response.output)
        // console.log('this.jobForm.form.value', this.jobForm.form.value)
      }
    )
  }
}
