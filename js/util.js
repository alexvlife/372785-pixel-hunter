export const render = (tpl) => {
  const elWrapper = document.createElement(`div`);
  elWrapper.innerHTML = tpl.trim();
  return elWrapper;
};

const gameField = document.querySelector(`#main`);

export const showScreen = (el) => {
  gameField.innerHTML = ``;
  gameField.appendChild(el);
};
