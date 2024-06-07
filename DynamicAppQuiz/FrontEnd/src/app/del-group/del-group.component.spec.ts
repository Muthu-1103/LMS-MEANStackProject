import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelGroupComponent } from './del-group.component';

describe('DelGroupComponent', () => {
  let component: DelGroupComponent;
  let fixture: ComponentFixture<DelGroupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelGroupComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
