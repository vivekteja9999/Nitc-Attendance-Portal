import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrDashboardComponent } from './cr-dashboard.component';

describe('CrDashboardComponent', () => {
  let component: CrDashboardComponent;
  let fixture: ComponentFixture<CrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
