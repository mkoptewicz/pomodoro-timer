const formatTimeInput = (num, maxValue) => {
  if (num > maxValue) {
    num = maxValue;
  }
  if (num < 0) {
    num = 0;
  }
  return num.toString().padStart(2, "0");
};

export default formatTimeInput;
