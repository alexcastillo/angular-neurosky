import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Component({
  selector: 'attention',
  template: `
  <div class="ball-container" [style.width.vw]="maxWidth | async">
  <div class="ball"  [style.width.px]="circleSize |async" [style.height.px]="circleSize | async" [ngStyle]="attentionTransform | async">
    <span [style.fontSize.px]="valueInsideCircle | async" class="valueInsideCircle">{{ valueInsideCircle | async }} </span>
  </div>
  </div>
  `,
  
  styles: [`

  .ball-container {

  }

  .ball {
    width:100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid white;
    transition: all 1s;
    display: flex;
    align-items: center;
    justify-content: center;


  }
  .valueInsideCircle {
    color: white;
    display:flex;
    align-self: center;
    text-align: center;
    font-size: 22px;
    font-family: 'Arial';
    transition: all 1s;
  }
  
  `]
})
export class AttentionComponent {
  offset = 60;
  socket = io('http://localhost:4501');
  brainwaves = Observable.fromEvent<any>(this.socket, 'metric:eeg');
  image = 'https://pbs.twimg.com/media/CiEn5P_WEAMn5wT.jpg';

  valueInsideCircle = this.brainwaves.map(eeg => eeg.eSense.attention);
  circleSize = this.brainwaves.map(eeg => eeg.eSense.attention * 2);

  attentionTransform = this.brainwaves
    .map(eeg => ({
        transform: `translateX(${ eeg.eSense.attention }vw)`
    }));
  
}


