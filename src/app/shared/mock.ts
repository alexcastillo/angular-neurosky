
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators/map';

export const range = [0, -5, -3, 3, 5];

export const simulate = (startAt, range) => {
    let metric = startAt;
    const offset = range[Math.floor(Math.random() * range.length)];
    if (metric !== 0 && metric !== 100) {
        metric += offset;
    }
    return metric;
};

export const createMock = (every = 1000):any => {
    let attentionStartAt = 0;
    let meditationStartAt = 0;
    return interval(every).pipe<any>(
        map(() => ({
            eSense: {
                attention: simulate(attentionStartAt, range),
                meditation: simulate(meditationStartAt, range)
            }
        }))
    );
};
    