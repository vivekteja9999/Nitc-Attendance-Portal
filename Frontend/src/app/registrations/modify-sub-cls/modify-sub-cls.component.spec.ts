import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifySubClsComponent } from './modify-sub-cls.component';

describe('ModifySubClsComponent', () => {
  let component: ModifySubClsComponent;
  let fixture: ComponentFixture<ModifySubClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifySubClsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifySubClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
