const reduceDates = (array) => {
  let arr = array.map((item) => {
    let year = item.date.substring(0, 4);
    return year;
  });
  return reduceArray(arr);
};

const reduceArray = (data) => {
  return data.reduce((accumulator, current) => {
    const length = accumulator.length;
    if (length === 0 || accumulator[length - 1] !== current) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
};

module.exports = {
  reduceDates,
  reduceArray
};
