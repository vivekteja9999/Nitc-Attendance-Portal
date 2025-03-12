import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleRegistrationComponent } from './cycle-registration.component';

describe('CycleRegistrationComponent', () => {
  let component: CycleRegistrationComponent;
  let fixture: ComponentFixture<CycleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
