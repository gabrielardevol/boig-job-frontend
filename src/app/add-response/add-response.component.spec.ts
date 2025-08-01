import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponseComponent } from './add-response.component';

describe('AddResponseComponent', () => {
  let component: AddResponseComponent;
  let fixture: ComponentFixture<AddResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
