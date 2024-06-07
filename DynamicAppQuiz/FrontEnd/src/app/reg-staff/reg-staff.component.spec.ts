import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegStaffComponent } from './reg-staff.component';

describe('RegStaffComponent', () => {
  let component: RegStaffComponent;
  let fixture: ComponentFixture<RegStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
