import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryTestComponent } from './temporary-test.component';

describe('TemporaryTestComponent', () => {
  let component: TemporaryTestComponent;
  let fixture: ComponentFixture<TemporaryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporaryTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
