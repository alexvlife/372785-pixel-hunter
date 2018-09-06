export const getClone = (currentObject) => {
  return JSON.parse(JSON.stringify(currentObject));
};
