export const getClone = (currentObject) => {
  return JSON.parse(JSON.stringify(currentObject));
};

export const toJSON = (data) => data.json();
