import { Component } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';
import { from } from 'rxjs/observable/from';
import { map, tap, zip, mergeMap } from 'rxjs/operators';
import { createAttentionMock } from '../shared/mock';
import * as io from 'socket.io-client';
import linspace from 'linspace';

const wsUrl = 'http://localhost:4501';
const video = { length: 5 };
const sampleRate = 250;
const offset = 30;

@Component({
  selector: 'attention',
  template: `
    <video muted [playbackRate]="1" [currentTime]="currentTime$|async">
      <source src="./assets/timelapse.mov" type="video/mp4" />
    </video>
    <aside>{{ attention$ | async }}%</aside>
  `,
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent {
  prev: any = 0;
  stream$ = fromEvent<any>(io(wsUrl), 'metric:eeg');
  attention$ = this.stream$.pipe(
    map(eeg => Math.abs((eeg as any).eSense.attention - offset))
  );
  currentTime$ = this.attention$.pipe(
    mergeMap(attention => {
      const range = from(linspace(this.prev, attention, sampleRate));
      this.prev = attention;
      return range;
    }),
    zip(interval(1000 / sampleRate), x => x),
    map(attention => Math.abs((video.length * (attention as any)) / 100))
  );
}
