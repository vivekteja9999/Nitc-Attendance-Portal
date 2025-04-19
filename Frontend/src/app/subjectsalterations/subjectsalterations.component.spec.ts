import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsalterationsComponent } from './subjectsalterations.component';

describe('SubjectsalterationsComponent', () => {
  let component: SubjectsalterationsComponent;
  let fixture: ComponentFixture<SubjectsalterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsalterationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsalterationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
