import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachershortageComponent } from './teachershortage.component';

describe('TeachershortageComponent', () => {
  let component: TeachershortageComponent;
  let fixture: ComponentFixture<TeachershortageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachershortageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachershortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
