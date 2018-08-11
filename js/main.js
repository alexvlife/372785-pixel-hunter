'use strict';

const MAIN_SCREEN = 1;
const RIGHT_ARROW_KEYCODE = 37;
const LEFT_ARROW_KEYCODE = 39;
const arrowBtnElems = document.querySelectorAll(`.arrows__btn`);

const gameField = document.querySelector(`#main`);

const showScreen = (el) => {
  gameField.innerHTML = ``;
  gameField.appendChild(el.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`))
                     .map((item) => item.content);

let currentScreen = 0;

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentScreen = index;
  showScreen(screens[currentScreen]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW_KEYCODE:
      selectScreen(currentScreen + 1);
      break;
    case LEFT_ARROW_KEYCODE:
      selectScreen(currentScreen - 1);
      break;
  }
});

for (let i = 0; i < arrowBtnElems.length; i++) {
  arrowBtnElems[i].addEventListener(`click`, (evt) => {
    switch (evt.target.name) {
      case `arrow-right`:
        selectScreen(currentScreen + 1);
        break;
      case `arrow-left`:
        selectScreen(currentScreen - 1);
        break;
    }
    evt.preventDefault();
  });
}

selectScreen(MAIN_SCREEN);
