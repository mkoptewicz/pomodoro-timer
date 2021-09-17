const formatTimeInput = (num, maxValue, padLength) => {
  if (+num > maxValue) {
    num = maxValue;
  }
  if (+num < 1) {
    num = 1;
  }
  return Number(num).toString().padStart(padLength, "0");
};

export default formatTimeInput;
