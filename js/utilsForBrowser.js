import {EMPTY_STRING} from "./game-config";

export const gameField = document.querySelector(`#main`);

export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

export const showScreen = (screenElement) => {
  gameField.innerHTML = EMPTY_STRING;
  gameField.appendChild(screenElement);
};
