import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiestoolbarComponent } from './activitiestoolbar.component';

describe('ActivitiestoolbarComponent', () => {
  let component: ActivitiestoolbarComponent;
  let fixture: ComponentFixture<ActivitiestoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiestoolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiestoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
