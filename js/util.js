export const render = (template) => {
  const wrapperElement = document.createElement(`div`);
  wrapperElement.innerHTML = template.trim();
  return wrapperElement;
};

const gameField = document.querySelector(`#main`);

export const showScreen = (el) => {
  gameField.innerHTML = ``;
  gameField.appendChild(el);
};
