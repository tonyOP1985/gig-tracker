import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('MM/DD/YYYY');
};

export const formatArrayDates = (array) => {
  array.forEach((item) => {
    item.date = formatDate(item.date);
  });
  return array;
};

// reduce array
export const reduceDates = (array) => {
  let arr = array.map((item) => {
    let year = item.date.substring(item.date.length - 4);
    return year;
  });
  return reduceArray(arr);
};

export const reduceArray = (data) => {
  return data.reduce((accumulator, current) => {
    const length = accumulator.length;
    if (length === 0 || accumulator[length - 1] !== current) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
};
