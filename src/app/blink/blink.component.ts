import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

@Component({
  selector: 'blink',
  templateUrl: 'blink.component.html',
  styleUrls: ['./blink.component.css']
})
export class BlinkComponent {
  socket = io('http://localhost:4501');
  blinks = Observable.fromEvent<any>(this.socket, 'metric:blinks');
  sayIt = this.blinks
    .debounceTime(500)
    .subscribe(({ blinkStrength }) => {
      const synth = window.speechSynthesis;
      const speech = new SpeechSynthesisUtterance(`Blinked`);
      synth.speak(speech);
    });
}
