import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfComponent } from './update-prof.component';

describe('UpdateProfComponent', () => {
  let component: UpdateProfComponent;
  let fixture: ComponentFixture<UpdateProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
