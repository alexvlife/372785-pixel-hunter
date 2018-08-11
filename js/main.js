const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;

const gameField = document.querySelector(`#main`);

const showScreen = (el) => {
  gameField.innerHTML = ``;
  gameField.appendChild(el.cloneNode(true));
}

const screens = Array.from(document.querySelectorAll(`template`))
                     .map((item) => item.content);

let currentScreen = 0;

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentScreen = index;
  showScreen(screens[currentScreen]);
}

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      selectScreen(currentScreen + 1);
      break;
    case LEFT_ARROW:
      selectScreen(currentScreen - 1);
      break;
  }
});

selectScreen(1);