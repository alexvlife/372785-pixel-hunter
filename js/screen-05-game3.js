import {render, showScreen} from './utils';
import stats from './screen-06-stats';
import greeting from './screen-01-greeting';

const gameHeaderTemplate = `<header class="header">
                              <button class="back">
                                <span class="visually-hidden">Вернуться к началу</span>
                                <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
                                  <use xlink:href="img/sprite.svg#arrow-left"></use>
                                </svg>
                                <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
                                  <use xlink:href="img/sprite.svg#logo-small"></use>
                                </svg>
                              </button>
                              <div class="game__timer">NN</div>
                              <div class="game__lives">
                                <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
                                <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
                                <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
                              </div>
                            </header>`;

const game3ScreenTemplate = `<section class="game">
                              <p class="game__task">Найдите рисунок среди изображений</p>
                              <form class="game__content  game__content--triple">
                                <div class="game__option">
                                  <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
                                </div>
                                <div class="game__option  game__option--selected">
                                  <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
                                </div>
                                <div class="game__option">
                                  <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
                                </div>
                              </form>
                            </section>`;

const gameStatsTemplate = `<ul class="stats">
                            <li class="stats__result stats__result--wrong"></li>
                            <li class="stats__result stats__result--slow"></li>
                            <li class="stats__result stats__result--fast"></li>
                            <li class="stats__result stats__result--correct"></li>
                            <li class="stats__result stats__result--wrong"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--slow"></li>
                            <li class="stats__result stats__result--unknown"></li>
                            <li class="stats__result stats__result--fast"></li>
                            <li class="stats__result stats__result--unknown"></li>
                          </ul>`;

const headerElement = render(gameHeaderTemplate);
const game3ScreenElement = render(game3ScreenTemplate);

const gameContent = game3ScreenElement.querySelector(`.game__content`);

game3ScreenElement.insertBefore(headerElement, game3ScreenElement.firstChild);
gameContent.insertAdjacentHTML(`afterEnd`, gameStatsTemplate);

gameContent.addEventListener(`click`, (evt) => {
  if (evt.target.tagName === `IMG`) {
    showScreen(stats);
  }
});

const goBackButton = game3ScreenElement.querySelector(`.back`);
goBackButton.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default game3ScreenElement;
