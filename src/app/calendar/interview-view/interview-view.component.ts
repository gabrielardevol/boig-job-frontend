import {Component, Input} from '@angular/core';
import {Interview} from '../../core/domain.models';
import {CommentInputComponent} from '../../shared/comment-input/comment-input.component';

@Component({
  selector: 'app-interview-view',
  imports: [
    CommentInputComponent
  ],
  templateUrl: './interview-view.component.html',
  styleUrl: './interview-view.component.scss'
})
export class InterviewViewComponent {
  @Input() interview!: Interview;

}
