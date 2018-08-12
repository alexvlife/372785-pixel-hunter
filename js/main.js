'use strict';

const MAIN_SCREEN_ID = 1;

const gameField = document.querySelector(`#main`);

const showScreen = (el) => {
  gameField.innerHTML = ``;
  gameField.appendChild(el.cloneNode(true));
};

const screens = Array.from(document.querySelectorAll(`template`))
                     .map((item) => item.content);

let currentScreen = MAIN_SCREEN_ID,
    switchValue = 0;

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  currentScreen = index;
  showScreen(screens[currentScreen]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.code) {
    case `ArrowRight`:
      switchValue = 1;
      break;
    case `ArrowLeft`:
      switchValue = -1;
      break;
  }
  selectScreen(currentScreen + switchValue);
});

const arrowsWrapEl = document.createElement(`div`);
arrowsWrapEl.className = `arrows__wrap`;
arrowsWrapEl.innerHTML = `<style>
                        .arrows__wrap {
                          position: absolute;
                          top: 95px;
                          left: 50%;
                          margin-left: -56px;
                        }
                        .arrows__btn {
                          background: none;
                          border: 2px solid black;
                          padding: 5px 20px;
                        }
                      </style>
                      <button type="button" class="arrows__btn" value="-1"><-</button>
                      <button type="button" class="arrows__btn" value="1">-></button>`;

document.body.appendChild(arrowsWrapEl);

arrowsWrapEl.addEventListener(`click`, (evt) => {
  switchValue = parseInt(evt.target.value, 10);
  selectScreen(currentScreen + switchValue);
});

selectScreen(currentScreen);
