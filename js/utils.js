export const gameField = document.querySelector(`#main`);

export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

export const showScreen = (screenElement) => {
  gameField.innerHTML = ``;
  gameField.appendChild(screenElement);
};

export const deepCloning = (currentObject) => {
  return JSON.parse(JSON.stringify(currentObject));
};
