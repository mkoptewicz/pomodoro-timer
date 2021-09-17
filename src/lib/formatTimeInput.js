const formatTimeInput = (num, maxValue, padLength) => {
  if (+num > maxValue) {
    num = maxValue;
  }
  if (+num < 0) {
    num = 0;
  }
  return Number(num).toString().padStart(padLength, "0");
};

export default formatTimeInput;
