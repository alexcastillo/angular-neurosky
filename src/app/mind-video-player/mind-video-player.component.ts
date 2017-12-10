import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { from } from 'rxjs/observable/from';
import { switchMap, map, zip } from 'rxjs/operators';
import { createMock } from '../shared/mock';
import * as io from 'socket.io-client';
import linspace from 'linspace';
import videos from './videos';

const clamp = metric => Math.min(Math.max(0, metric), 100);

@Component({
  selector: 'mind-video-player',
  templateUrl: './mind-video-player.component.html',
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
    map((eeg: any) => eeg.eSense[this.metricName])
  );

  currentTime$ = this.metric$.pipe(
    switchMap(metric => {
      const range = from(linspace(this.prevMetric, metric, this.video.fps));
      this.prevMetric = metric;
      return range.pipe(
        zip(interval(1000 / this.video.fps), (metric: any) =>
          (this.video.length * clamp(metric  - this.video.offset)) / 100
        )
      );
    })
  );
}
