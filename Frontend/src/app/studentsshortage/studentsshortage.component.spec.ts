import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsshortageComponent } from './studentsshortage.component';

describe('StudentsshortageComponent', () => {
  let component: StudentsshortageComponent;
  let fixture: ComponentFixture<StudentsshortageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsshortageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsshortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
