import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherclasswiseComponent } from './teacherclasswise.component';

describe('TeacherclasswiseComponent', () => {
  let component: TeacherclasswiseComponent;
  let fixture: ComponentFixture<TeacherclasswiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherclasswiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherclasswiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
