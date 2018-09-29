import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { fromEvent } from "rxjs/observable/fromEvent";
import { interval } from "rxjs/observable/interval";
import { from } from "rxjs/observable/from";
import { switchMap, scan, map, zip } from "rxjs/operators";
import { createMock } from "../shared/mock";
import * as io from "socket.io-client";
import linspace from "linspace";
import videos from "./videos";
import { timeMapper } from "../shared/utils";

@Component({
  selector: "mind-video-player",
  templateUrl: "./mind-video-player.component.html",
  styleUrls: ["./mind-video-player.component.css"]
})
export class MindVideoPlayerComponent {
  constructor(private route: ActivatedRoute) {}

  started$ = new BehaviorSubject(false);
  socket = io("http://localhost:4501");
  metricName = this.route.snapshot.paramMap.get("metricName");
  videoName = this.route.snapshot.paramMap.get("videoName");
  isMock = this.route.snapshot.queryParamMap.get("mock");
  video = videos[this.metricName][this.videoName];

  stream$ = !this.isMock
    ? fromEvent(this.socket, "metric/eeg")
    : createMock(1000);

  metricValue$ = this.stream$.pipe(
    map(({ eSense }) => eSense[this.metricName])
  );

  currentTime$ = this.metricValue$.pipe(
    scan(([, prev], next: number) => [prev, next], [0, 0]),
    switchMap(([prev, next]) =>
      from(linspace(prev, next, this.video.fps)).pipe(
        zip(interval(1000 / this.video.fps), metricValue =>
          timeMapper(metricValue, this.video)
        )
      )
    )
  );

  start() {
    this.socket.emit("start");
    this.started$.next(true);
  }

  stop() {
    this.socket.emit("stop");
    this.started$.next(false);
  }

  ngOnInit() {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 32: // space
          this.start();
          break;
        case 27: // esc
          this.stop();
          break;
      }
    });
  }
}
