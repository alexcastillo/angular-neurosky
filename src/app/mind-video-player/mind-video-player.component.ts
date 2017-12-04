import { Component } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { from } from 'rxjs/observable/from';
import { map, tap, zip, mergeMap } from 'rxjs/operators';
import { createMock } from '../shared/mock';
import * as io from 'socket.io-client';
import linspace from 'linspace';

import { videos, defaultMetric, defaultVideo } from '../shared/videos';

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
  prevMetric: any = 0;
  metricName = defaultMetric;
  video: any = videos[defaultMetric][defaultVideo];
  stream$ = fromEvent(io('http://localhost:4501'), 'metric:eeg');
  metric$ = this.stream$.pipe(
    map((eeg: any) => Math.abs(eeg.eSense[this.metricName] - this.video.offset))
  );
  currentTime$ = this.metric$.pipe(
    mergeMap(metric => {
      const range = from(linspace(this.prevMetric, metric, this.video.fps));
      this.prevMetric = metric;
      return range;
    }),
    zip(interval(1000 / this.video.fps), x => x),
    map((metric: any) => Math.abs((this.video.length * metric) / 100))
  );
}
