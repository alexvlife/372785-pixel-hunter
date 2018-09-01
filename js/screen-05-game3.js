import {render, showScreen} from './utils';
import stats from './screen-06-stats';
import greeting from './screen-01-greeting';
import getStateTemplate from './templates/state';
import getHeaderTemplate from './templates/header';
import questions from './mocks/questions';

const gameStateTemplate = getStateTemplate(1, 30);
const gameHeaderTemplate = getHeaderTemplate(gameStateTemplate);

const game3ScreenTemplate = `<section class="game">
                              <p class="game__task">Найдите рисунок среди изображений</p>
                              <form class="game__content  game__content--triple">
                                <div class="game__option">
                                  <img src="${questions[2].images[0].url}" alt="Option 1" width="304" height="455">
                                </div>
                                <div class="game__option  game__option--selected">
                                  <img src="${questions[2].images[1].url}" alt="Option 2" width="304" height="455">
                                </div>
                                <div class="game__option">
                                  <img src="${questions[2].images[2].url}" alt="Option 3" width="304" height="455">
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
