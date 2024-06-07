import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogStaffComponent } from './log-staff.component';

describe('LogStaffComponent', () => {
  let component: LogStaffComponent;
  let fixture: ComponentFixture<LogStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
