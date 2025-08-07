import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Offer} from '../core/domain.models';
import { v4 as uuidv4 } from 'uuid';
import {LlmApiService} from '../core/llm.api';
import {BackendApiService} from '../core/backend.api';
import {ModalLayoutComponent} from '../shared/modal-layout/modal-layout.component';

@Component({
  selector: 'app-add-application',
  imports: [
    FormsModule,
    ModalLayoutComponent
  ],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.scss'
})
export class AddApplicationComponent {

  @ViewChild('jobForm') jobForm!: NgForm;

  @Output() close = new EventEmitter();
  submitting: boolean = false;
  constructor(private llmApi: LlmApiService, private backendApi: BackendApiService) {
  }

  onSubmit(formValue: any) {
    this.submitting = true;
    console.log(formValue)
    const offerData: Offer  = {
      id: uuidv4(),
      text: formValue.text,
      company: formValue.company,
      role: formValue.role,
      experienceMinimum: parseInt(formValue.experienceMinimum),
      experienceMaximum: parseInt(formValue.experienceMaximum),
      salaryMinimum: parseInt(formValue.salaryMinimum),
      salaryMaximum: parseInt(formValue.salaryMaximum),
      skills: typeof (formValue.skills) == 'string' ? formValue.skills.split(",") : formValue.skills,
      contractType: formValue.contractType,
      recruiter: formValue.recruiter,
      platform: formValue.platform,
      location: formValue.location,
      typology: formValue.typology,
      appliedAt: new Date(),
      responses: [],
      state: 0,
      comments: []
    };
    this.backendApi.createOffer(offerData).subscribe(
      response => {console.log(response);
      this.backendApi.newStatusChange(response.id, 1).subscribe(
        response => {
          this.submitting = false;
          this.close.emit('')}
      )}
    )

    // this.jobForm.reset()
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
