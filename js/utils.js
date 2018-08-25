export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

const gameField = document.querySelector(`#main`);

export const showScreen = (screenElement) => {
  gameField.innerHTML = ``;
  gameField.appendChild(screenElement);
};
