import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { startWith, map } from 'rxjs/operators';
import { createMock } from '../shared/mock';
import * as io from 'socket.io-client';
import images from './images';
import { clamp, reverse } from '../shared/utils';

@Component({
  selector: 'mind-image-filter',
  templateUrl: './mind-image-filter.component.html',
  styleUrls: ['./mind-image-filter.component.css']
})
export class MindImageFilterComponent {
  
  constructor (private route: ActivatedRoute) {}

  metricName = this.route.snapshot.paramMap.get('metricName');
  imageName = this.route.snapshot.paramMap.get('imageName');
  image: any = images[this.metricName][this.imageName];
  prevMetric: any = this.image.startWith;

  stream$ = fromEvent(io('http://localhost:4501'), 'metric/eeg');

  metric$ = this.stream$.pipe(
    map((eeg: any) => eeg.eSense[this.metricName]),
    map((metric: any) => this.image.reverse ? reverse(metric) : metric),
    startWith(this.image.startWith)
  );

  filter$ = this.metric$.pipe(
    map((metric: any) => {
      const { filter, offset, unit } = this.image;
      const value = clamp(metric - offset);
      return { filter: `${filter}(${value}${unit})` };
    })
  );
}
