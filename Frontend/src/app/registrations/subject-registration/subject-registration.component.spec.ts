import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectRegistrationComponent } from './subject-registration.component';

describe('SubjectRegistrationComponent', () => {
  let component: SubjectRegistrationComponent;
  let fixture: ComponentFixture<SubjectRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
