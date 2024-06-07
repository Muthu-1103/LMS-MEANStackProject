import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffpassComponent } from './update-staffpass.component';

describe('UpdateStaffpassComponent', () => {
  let component: UpdateStaffpassComponent;
  let fixture: ComponentFixture<UpdateStaffpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStaffpassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStaffpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
