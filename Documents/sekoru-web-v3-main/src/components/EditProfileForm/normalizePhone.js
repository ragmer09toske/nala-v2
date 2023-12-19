const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}

export const normalizePrice = (value) => {
  if (!value) {
    return value;
  }
  let wholePart = Math.floor(value);
  if (wholePart.toString().length > 13) {
    return value.slice(0, -1);
  }
  const regex = /^[0-9]*\.?[0-9]{0,2}$/;
  if (!regex.test(value)) {
    return value.slice(0, -1);
  }
  return value;
}

export default normalizePhone