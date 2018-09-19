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

export const showModal = (modalElement) => {
  gameField.appendChild(modalElement);
};

export const hideModal = (modalElement) => {
  gameField.removeChild(modalElement);
};
