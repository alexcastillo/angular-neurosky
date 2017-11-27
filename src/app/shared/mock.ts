
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators/map';

export const createAttentionMock = (every = 1000):any => {
    let attention = 50;
    return interval(every).pipe<any>(
        map(() => {
            const ranges = [0, -5, -3, 3, 5];
            const offset = ranges[Math.floor(Math.random() * ranges.length)];
            if (attention !== 0 && attention !== 100) {
                attention += offset;
            }
            return {
                eSense: { attention }
            };
        })
    );
};
    