
export const defaultMetric = 'attention';
export const defaultVideo = 'coffee';

export const videos = {
    attention: {
        flower: {
            url: './assets/flower.mov',
            type: 'video/mp4',
            fontColor: 'beige',
            playbackRate: 1,
            length: 5,
            offset: 30,
            fps: 60
        },
        coffee: {
            url: './assets/coffee-pour.mov',
            type: 'video/mp4',
            fontColor: 'beige',
            playbackRate: 1,
            length: 24,
            offset: 30,
            fps: 60
        },
        beer: {
            url: './assets/beer-pour.mp4',
            type: 'video/mp4',
            fontColor: 'beige',
            playbackRate: 1,
            length: 27,
            offset: 20,
            fps: 60
        }
    },
    meditation: {
        coffee: {
            url: './assets/coffee-spill.mp4',
            type: 'video/mp4',
            fontColor: 'black',
            playbackRate: 1,
            length: 26,
            offset: 0,
            fps: 60
        }
    }
};

export default videos;
