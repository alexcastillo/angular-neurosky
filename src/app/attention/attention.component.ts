import { Component } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Component({
  selector: 'attention',
  template: `
  <div class="attention-container">
      <div class="ball-container">
        <div class="ball"  [style.width.px]="circleSize" [style.height.px]="circleSize" [ngStyle]="attentionTransform">
          <span [style.fontSize.px]="valueInsideCircle" class="valueInsideCircle">{{valueInsideCircle}} </span>
        </div>
      </div>
        <div class="buttons-container">
        <button (click)="simulateBrainwaves()" [hidden]="brainTimerSubscription">Simulate Brainwaves</button>
        <button (click)="cancelSimulation()" [hidden]="!brainTimerSubscription">Cancel Simulation</button>
      </div>
  </div>
  `,

  styles: [`
  .attention-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow:hidden;
  }

  button {
    height:40px;
    color: #000;
    background-color: #EEE;
    padding: 0 6px 0 6px;
    margin: 6px 8px 6px 8px;
    min-width: 88px;
    border-radius: 3px;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    text-decoration:none;
    border: none;
    outline: none;
  }
  .buttons-container{
    text-align:center;
    padding-top: 200px;
  }
  .ball-container {
    display:flex;
    flex:1;
    width:100vw;
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
  attention: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  offset = 60;
  socket = io('http://localhost:4501');
  brainwaves = Observable.fromEvent<any>(this.socket, 'metric:eeg');
  attentionTransform: any;
  image = 'https://pbs.twimg.com/media/CiEn5P_WEAMn5wT.jpg';
  brainTimerSubscription: Subscription;

  valueInsideCircle: number;
  circleSize: number;
  simulatedValue: number = 100;

  constructor() {
    this.brainwaves.subscribe(eeg => {
      this.attention.next(eeg.eSense.attention);
    });

    this.attention.subscribe(attention => {
      this.valueInsideCircle = attention;
      this.circleSize = attention * 2;
      this.attentionTransform = { transform: `translateX(${attention}vw)`, 'margin-left' : `-${this.circleSize / 2}px` };
    });

    this.attention.next(50);
  }

  simulateBrainwaves() {
    this.brainTimerSubscription = Observable.timer(0, 500).subscribe(value => {
      this.simulatedValue = Math.max(Math.min(Math.floor(this.simulatedValue + (Math.random() * 15) - (Math.random() * 25)), 100), 10);
      this.attention.next(this.simulatedValue);
    });
  }

  cancelSimulation() {
    this.brainTimerSubscription.unsubscribe();
    this.brainTimerSubscription = null;
    this.attention.next(50);
    this.simulatedValue = 50;
  }

}


