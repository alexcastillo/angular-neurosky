import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkComponent } from './blink.component';

describe('BlinkComponent', () => {
  let component: BlinkComponent;
  let fixture: ComponentFixture<BlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
