import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindVideoPlayerComponent } from './mind-video-player.component';

describe('MindVideoPlayerComponent', () => {
  let component: MindVideoPlayerComponent;
  let fixture: ComponentFixture<MindVideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindVideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
