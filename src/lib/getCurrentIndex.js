const getCurrentIndex = (num, interval) => {
  let index = num % 2;
  if (num > 0 && num % (interval * 2) === interval * 2 - 1) {
    index = 2;
  }

  return index;
};
export default getCurrentIndex;
