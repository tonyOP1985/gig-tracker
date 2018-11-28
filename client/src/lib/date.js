import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('MM/DD/YYYY');
};

export const formatArrayDates = (array) => {
  array.forEach((arr) => {
    arr.date = formatDate(arr.date);
  });
  return array;
};
