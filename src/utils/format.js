import {format} from 'date-fns';

export const formatTimestamp = (timestamp) => {
  return format(new Date(timestamp), 'HH:mm');
};

export const formatDateLabel = (timestamp) => {
  return format(new Date(timestamp), 'dd/MM HH:mm');
};

export const roundMetric = (value, decimals = 1) =>
  Number.parseFloat(value).toFixed(decimals);
