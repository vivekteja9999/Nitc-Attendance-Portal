import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRegistrationComponent } from './key-registration.component';

describe('KeyRegistrationComponent', () => {
  let component: KeyRegistrationComponent;
  let fixture: ComponentFixture<KeyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
