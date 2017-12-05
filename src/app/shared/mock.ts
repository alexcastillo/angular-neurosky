
import linspace from 'linspace';
import { interval } from 'rxjs/observable/interval';
import { scan } from 'rxjs/operators/scan';

export const range = linspace(-5, 5, 11);
export const seed = { eSense: { attention: 50, meditation: 50 } };

export const simulate = prev => {
    let metric = prev;
    const offset = range[Math.floor(Math.random() * range.length)];
    if (metric + offset > 0 && metric + offset <= 100) {
        metric += offset;
    }
    return metric;
};

export const createMock = (every = 1000):any =>
    interval(every).pipe<any>(
        scan(({ eSense: { attention, meditation } }: any) => ({
            eSense: {
                attention: simulate(attention),
                meditation: simulate(meditation)
            }
        }), seed)
    );
