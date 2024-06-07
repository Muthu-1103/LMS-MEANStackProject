import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmsgComponent } from './postmsg.component';

describe('PostmsgComponent', () => {
  let component: PostmsgComponent;
  let fixture: ComponentFixture<PostmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostmsgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
