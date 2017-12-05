import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { from } from 'rxjs/observable/from';
import { map, tap, zip, switchMap } from 'rxjs/operators';
import { createMock } from '../shared/mock';
import * as io from 'socket.io-client';
import linspace from 'linspace';
import videos from '../shared/videos';


@Component({
  selector: 'mind-video-player',
  template: `
    <video muted
      [currentTime]="currentTime$ | async"
      [playbackRate]="video.playbackRate">
      <source [src]="video.url" [type]="video.type" />
    </video>
    <aside>{{ metric$ | async }}%</aside>
  `,
  styleUrls: ['./mind-video-player.component.css']
})
export class MindVideoPlayerComponent {
  
  constructor (private route: ActivatedRoute) {}

  prevMetric: any = 0;
  metricName = this.route.snapshot.paramMap.get('metricName');
  videoName = this.route.snapshot.paramMap.get('videoName');
  video: any = videos[this.metricName][this.videoName];

  stream$ = fromEvent(io('http://localhost:4501'), 'metric:eeg');

  metric$ = this.stream$.pipe(
    map((eeg: any) => Math.abs(eeg.eSense[this.metricName] - this.video.offset))
  );

  currentTime$ = this.metric$.pipe(
    switchMap(metric => {
      const range = from(linspace(this.prevMetric, metric, this.video.fps));
      this.prevMetric = metric;
      return range;
    }),
    zip(interval(this.video.fps), metric => metric),
    map((metric: any) => Math.abs((this.video.length * metric) / 100))
  );
}
