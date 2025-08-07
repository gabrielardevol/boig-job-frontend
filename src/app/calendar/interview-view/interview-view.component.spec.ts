import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewViewComponent } from './interview-view.component';

describe('InterviewViewComponent', () => {
  let component: InterviewViewComponent;
  let fixture: ComponentFixture<InterviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
