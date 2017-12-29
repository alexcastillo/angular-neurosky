
export const clamp = metricValue =>
    Math.min(Math.max(0, metricValue), 100);

export const reverse = metricValue =>
    Math.abs(metricValue - 100);

export const timeMapper = (metricValue, { length, offset }) =>
    length * clamp(metricValue - offset) / 100;
