import {Component, Input} from '@angular/core';
import {Assignment} from '../../core/domain.models';
import {CommentInputComponent} from '../../shared/comment-input/comment-input.component';

@Component({
  selector: 'app-assignment-view',
  imports: [
    CommentInputComponent
  ],
  templateUrl: './assignment-view.component.html',
  styleUrl: './assignment-view.component.scss'
})
export class AssignmentViewComponent {
  @Input() assignment!: Assignment;

}
