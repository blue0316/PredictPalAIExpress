export const convertArrayValuesToString = (obj) => {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = JSON.stringify(obj[key]);
    }
  }

  return result;
};
