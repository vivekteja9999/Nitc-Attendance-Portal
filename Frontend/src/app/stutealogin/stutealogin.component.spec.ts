import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StutealoginComponent } from './stutealogin.component';

describe('StutealoginComponent', () => {
  let component: StutealoginComponent;
  let fixture: ComponentFixture<StutealoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StutealoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StutealoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
