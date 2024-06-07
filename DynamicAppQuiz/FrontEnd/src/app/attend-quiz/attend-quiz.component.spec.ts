import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendQuizComponent } from './attend-quiz.component';

describe('AttendQuizComponent', () => {
  let component: AttendQuizComponent;
  let fixture: ComponentFixture<AttendQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
