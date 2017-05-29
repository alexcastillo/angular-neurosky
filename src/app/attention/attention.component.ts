import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Component({
  selector: 'attention',
  template: `<img [src]="image" [ngStyle]="(attentionFilter | async)" />`,
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent {
  offset = 30;
  socket = io('http://localhost:4301');
  brainwaves = Observable.fromEvent<any>(this.socket, 'metric:eeg');
  image = 'https://pbs.twimg.com/media/CiEn5P_WEAMn5wT.jpg';
  attentionFilter = this.brainwaves
    .map(eeg => ({
        filter: `blur(${ Math.abs(eeg.eSense.attention - this.offset) }px)`
    }));
}
