import {Component, Input, ViewChild} from '@angular/core';
import {BackendApiService} from '../../core/backend.api';
import {FormsModule, NgForm} from '@angular/forms';
import {AppComment} from '../../core/domain.models';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-comment-input',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {
  @ViewChild('jobForm') jobForm!: NgForm;

  @Input() id: string | number = '';
  @Input() context!: 'offer' | 'interview' | 'assignment';
  backendApi: BackendApiService;
  comments: AppComment[] = [];

  constructor(backendApi: BackendApiService) {
    this.backendApi = backendApi;
    backendApi.getComments(this.context, this.id).subscribe(
      res => this.comments = res
    );
  }

  ngOnInit() {
    this.backendApi.getComments(this.context, this.id).subscribe(
      res => this.comments = res
    );
  }

  onSubmit(value: any) {
    console.log(value.content, this.context, this.id)
    const data: AppComment = {
      content: value.content
    }

    switch (this.context) {
      case 'offer':
        data.offer = '/api/offers/'+this.id;
        break;
      case 'interview':
        data.interview = '/api/interviews/'+this.id;
        break;
      case 'assignment':
        data.assignment = '/api/assignments/'+this.id;
        break;
    }

    console.log(data)
    this.backendApi.createComment(data).subscribe(res => console.log(res))
  }
}
