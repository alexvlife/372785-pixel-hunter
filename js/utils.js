export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

export const showScreen = (el) => {
  const gameField = document.querySelector(`#main`);
  gameField.innerHTML = ``;
  gameField.appendChild(el);
};
