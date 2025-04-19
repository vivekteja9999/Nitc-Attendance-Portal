import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentpercentComponent } from './studentpercent.component';

describe('StudentpercentComponent', () => {
  let component: StudentpercentComponent;
  let fixture: ComponentFixture<StudentpercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentpercentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentpercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
