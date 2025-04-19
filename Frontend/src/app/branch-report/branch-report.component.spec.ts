import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchReportComponent } from './branch-report.component';

describe('BranchReportComponent', () => {
  let component: BranchReportComponent;
  let fixture: ComponentFixture<BranchReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
